import { TopicHeader } from "@/components/TopicHeader";
import {
  TopicSection,
  InfoCard,
  BulletList,
  ComparisonTable,
} from "@/components/TopicSection";
import { TopicLayout } from "@/components/TopicLayout";

const sections = [
  { id: "what-is-vpc", title: "What is a VPC?" },
  { id: "subnets", title: "Subnets" },
  { id: "internet-gateway", title: "Internet Gateway & NAT" },
  { id: "security", title: "Security Groups & NACLs" },
  { id: "vpc-peering", title: "VPC Peering" },
  { id: "vpc-endpoints", title: "VPC Endpoints" },
  { id: "vpn-directconnect", title: "VPN & Direct Connect" },
  { id: "flow-logs", title: "VPC Flow Logs" },
  { id: "exam-scenarios", title: "Exam Scenarios" },
];

export default function VPCPage() {
  return (
    <TopicLayout topic="VPC & Networking">
      <div className="p-6 md:p-10 max-w-4xl mx-auto">
        <TopicHeader
          icon="🔒"
          title="VPC & Networking"
          subtitle="Virtual Private Cloud - Your isolated network in the AWS cloud"
          sections={sections}
        />

        <TopicSection title="What is a VPC?" id="what-is-vpc">
          <InfoCard>
            <p className="mb-3">
              <strong>Virtual Private Cloud (VPC)</strong> — A logically isolated section of the AWS cloud
              where you launch resources in a virtual network that you define.
            </p>
            <BulletList
              items={[
                "Your own private network within AWS",
                "Regional resource (spans all AZs in a region)",
                "You control: IP ranges, subnets, route tables, gateways",
                "Default VPC: Created automatically in each region (public by default)",
                "Custom VPC: You create and configure everything",
                "CIDR Block: IP address range (e.g., 10.0.0.0/16 = 65,536 IPs)",
                "Max 5 VPCs per region (soft limit, can be increased)",
              ]}
            />
          </InfoCard>
          <InfoCard variant="tip" title="Memory Aid">
            <p>&quot;VPC = Your own data center in the cloud&quot; — Think of it as building walls around your resources. You decide who gets in and who doesn&apos;t.</p>
          </InfoCard>
        </TopicSection>

        <TopicSection title="Subnets" id="subnets">
          <InfoCard title="What are Subnets?">
            <p className="mb-3">
              Subnets are sub-ranges of IP addresses within your VPC, tied to a specific Availability Zone.
            </p>
            <BulletList
              items={[
                "A subnet lives in ONE Availability Zone (cannot span AZs)",
                "Public Subnet: Has a route to the Internet Gateway",
                "Private Subnet: No direct route to the internet",
                "AWS reserves 5 IPs in each subnet (first 4 + last 1)",
                "Example: 10.0.0.0/24 = 256 IPs, but only 251 usable",
              ]}
            />
          </InfoCard>

          <InfoCard title="Public vs Private Subnets">
            <ComparisonTable
              headers={["Feature", "Public Subnet", "Private Subnet"]}
              rows={[
                ["Internet access", "Yes (via Internet Gateway)", "No direct access"],
                ["Route table", "Route to IGW (0.0.0.0/0 → IGW)", "No route to IGW"],
                ["Use case", "Web servers, load balancers", "Databases, app servers"],
                ["Public IP", "Auto-assigned or Elastic IP", "No public IP needed"],
                ["Outbound internet", "Direct via IGW", "Via NAT Gateway/Instance"],
              ]}
            />
          </InfoCard>

          <InfoCard variant="important" title="Typical Architecture">
            <BulletList
              items={[
                "Public subnet: ALB (Load Balancer) — receives traffic from internet",
                "Private subnet: EC2 instances (app servers) — only accessible via ALB",
                "Private subnet: RDS database — only accessible from app servers",
                "This is the standard 3-tier architecture on AWS",
              ]}
            />
          </InfoCard>
        </TopicSection>

        <TopicSection title="Internet Gateway & NAT" id="internet-gateway">
          <InfoCard title="Internet Gateway (IGW)">
            <BulletList
              items={[
                "Allows communication between VPC and the internet",
                "Horizontally scaled, redundant, highly available",
                "One IGW per VPC (1:1 relationship)",
                "Must update route table to point 0.0.0.0/0 → IGW",
                "Resources need a public IP to use the IGW",
              ]}
            />
          </InfoCard>

          <InfoCard title="NAT Gateway">
            <BulletList
              items={[
                "Allows private subnet resources to access the internet (outbound only)",
                "Internet CANNOT initiate connections to private resources",
                "Managed by AWS, scales automatically",
                "Created in a PUBLIC subnet, used by PRIVATE subnets",
                "Costs: Hourly charge + data processing charge",
                "AZ-specific: Create one per AZ for high availability",
                "Use case: Software updates, API calls from private instances",
              ]}
            />
          </InfoCard>

          <InfoCard title="NAT Gateway vs NAT Instance">
            <ComparisonTable
              headers={["Feature", "NAT Gateway", "NAT Instance"]}
              rows={[
                ["Managed by", "AWS (fully managed)", "You (EC2 instance)"],
                ["Availability", "Highly available in AZ", "You manage failover"],
                ["Bandwidth", "Up to 100 Gbps", "Depends on instance type"],
                ["Cost", "Higher (managed service)", "Lower (just EC2 cost)"],
                ["Maintenance", "None", "You patch and maintain"],
                ["Recommendation", "Use this (best practice)", "Legacy, avoid"],
              ]}
            />
          </InfoCard>
        </TopicSection>

        <TopicSection title="Security Groups & NACLs" id="security">
          <InfoCard title="Security Groups (SG)">
            <BulletList
              items={[
                "Virtual firewall at the INSTANCE level (ENI level)",
                "STATEFUL: If traffic is allowed in, response is automatically allowed out",
                "Only ALLOW rules (no deny rules)",
                "Default: All inbound DENIED, all outbound ALLOWED",
                "Can reference other security groups (powerful for VPC design)",
                "Evaluated as a whole: All rules are checked before deciding",
              ]}
            />
          </InfoCard>

          <InfoCard title="Network ACLs (NACLs)">
            <BulletList
              items={[
                "Firewall at the SUBNET level",
                "STATELESS: Must explicitly allow both inbound AND outbound",
                "Has both ALLOW and DENY rules",
                "Rules are evaluated in order (lowest number first)",
                "Default NACL: Allows all inbound and outbound",
                "Custom NACL: Denies all by default",
                "One NACL per subnet, one subnet per NACL",
              ]}
            />
          </InfoCard>

          <InfoCard variant="important" title="Security Groups vs NACLs">
            <ComparisonTable
              headers={["Feature", "Security Group", "NACL"]}
              rows={[
                ["Level", "Instance (ENI)", "Subnet"],
                ["Stateful/Stateless", "Stateful", "Stateless"],
                ["Rules", "Allow only", "Allow AND Deny"],
                ["Rule evaluation", "All rules evaluated", "Rules in order (first match)"],
                ["Default inbound", "Deny all", "Allow all (default NACL)"],
                ["Applies to", "Only assigned instances", "All instances in subnet"],
              ]}
            />
          </InfoCard>

          <InfoCard variant="tip" title="Exam Tip">
            <p>&quot;Security Group = Stateful, Instance level. NACL = Stateless, Subnet level.&quot; — If the question mentions blocking a specific IP, you need a NACL (Security Groups can&apos;t deny).</p>
          </InfoCard>
        </TopicSection>

        <TopicSection title="VPC Peering" id="vpc-peering">
          <InfoCard title="VPC Peering">
            <BulletList
              items={[
                "Connect two VPCs privately using AWS network",
                "Behave as if they are in the same network",
                "Can peer across accounts and across regions",
                "CIDR blocks must NOT overlap",
                "NOT transitive: A↔B and B↔C does NOT mean A↔C",
                "Must update route tables in BOTH VPCs",
                "Use case: Share resources between VPCs/accounts",
              ]}
            />
          </InfoCard>

          <InfoCard variant="warning" title="VPC Peering is NOT Transitive!">
            <p>If VPC-A peers with VPC-B, and VPC-B peers with VPC-C, VPC-A <strong>cannot</strong> communicate with VPC-C through VPC-B. You need a direct peering connection between A and C. For many VPCs, consider <strong>Transit Gateway</strong> instead.</p>
          </InfoCard>
        </TopicSection>

        <TopicSection title="VPC Endpoints" id="vpc-endpoints">
          <InfoCard title="What are VPC Endpoints?">
            <p className="mb-3">
              Allow you to connect to AWS services <strong>privately</strong> without using the public internet.
              Traffic stays within the AWS network.
            </p>
            <BulletList
              items={[
                "No need for IGW, NAT, VPN, or Direct Connect",
                "More secure: Traffic never leaves AWS network",
                "Lower latency and no data transfer charges",
                "Two types: Gateway Endpoints and Interface Endpoints",
              ]}
            />
          </InfoCard>

          <InfoCard title="Gateway vs Interface Endpoints">
            <ComparisonTable
              headers={["Feature", "Gateway Endpoint", "Interface Endpoint"]}
              rows={[
                ["Supports", "S3 and DynamoDB ONLY", "Most other AWS services"],
                ["How it works", "Route table entry", "ENI with private IP (uses PrivateLink)"],
                ["Cost", "Free", "Hourly + data processing"],
                ["Access from", "Within VPC only", "VPC, on-premises, other VPCs"],
              ]}
            />
          </InfoCard>

          <InfoCard variant="tip" title="Exam Tip">
            <p>&quot;Access S3 from private subnet without internet&quot; → VPC Gateway Endpoint for S3. &quot;Access other AWS services privately&quot; → Interface Endpoint (PrivateLink).</p>
          </InfoCard>
        </TopicSection>

        <TopicSection title="VPN & Direct Connect" id="vpn-directconnect">
          <InfoCard title="Site-to-Site VPN">
            <BulletList
              items={[
                "Encrypted connection over the PUBLIC internet",
                "Connects on-premises data center to AWS VPC",
                "Components: Virtual Private Gateway (AWS side) + Customer Gateway (your side)",
                "Quick to set up (minutes to hours)",
                "Lower cost but variable performance (internet-dependent)",
                "Supports IPsec encryption",
              ]}
            />
          </InfoCard>

          <InfoCard title="AWS Direct Connect">
            <BulletList
              items={[
                "DEDICATED private physical connection to AWS",
                "Does NOT go over the public internet",
                "Consistent network performance, low latency",
                "Higher bandwidth: 1 Gbps or 10 Gbps",
                "Takes weeks to months to establish",
                "More expensive but more reliable",
                "Use case: Large data transfers, hybrid cloud, compliance",
              ]}
            />
          </InfoCard>

          <InfoCard title="VPN vs Direct Connect">
            <ComparisonTable
              headers={["Feature", "Site-to-Site VPN", "Direct Connect"]}
              rows={[
                ["Connection", "Over public internet (encrypted)", "Private dedicated line"],
                ["Setup time", "Minutes to hours", "Weeks to months"],
                ["Cost", "Lower", "Higher"],
                ["Bandwidth", "Limited by internet", "1 Gbps or 10 Gbps"],
                ["Latency", "Variable", "Consistent, low"],
                ["Encryption", "Yes (IPsec)", "Not encrypted by default"],
                ["Use case", "Quick, budget-friendly", "High bandwidth, compliance"],
              ]}
            />
          </InfoCard>

          <InfoCard title="Transit Gateway">
            <BulletList
              items={[
                "Hub-and-spoke model to connect thousands of VPCs and on-premises",
                "Simplifies complex network topologies",
                "Transitive peering: All connected networks can communicate",
                "Works with VPN, Direct Connect, and VPC peering",
                "Regional resource but can peer across regions",
              ]}
            />
          </InfoCard>
        </TopicSection>

        <TopicSection title="VPC Flow Logs" id="flow-logs">
          <InfoCard title="VPC Flow Logs">
            <BulletList
              items={[
                "Capture information about IP traffic going to/from network interfaces",
                "Levels: VPC level, Subnet level, or ENI level",
                "Helps troubleshoot connectivity issues",
                "Can be sent to: CloudWatch Logs or S3",
                "Captures: Source/dest IP, ports, protocol, action (ACCEPT/REJECT)",
                "Does NOT capture: DNS traffic to Route 53, DHCP, metadata (169.254.169.254)",
              ]}
            />
          </InfoCard>

          <InfoCard variant="tip" title="Exam Tip">
            <p>&quot;Troubleshoot why traffic is being rejected&quot; → VPC Flow Logs. They show you ACCEPT and REJECT decisions for all traffic in your VPC.</p>
          </InfoCard>
        </TopicSection>

        <TopicSection title="Exam Scenarios" id="exam-scenarios">
          <ComparisonTable
            headers={["Scenario", "Answer"]}
            rows={[
              ["Isolate resources in your own network", "VPC"],
              ["Allow EC2 in private subnet to access internet", "NAT Gateway"],
              ["Block a specific IP address", "NACL (deny rule)"],
              ["Allow only port 443 to an instance", "Security Group (allow rule)"],
              ["Connect two VPCs privately", "VPC Peering"],
              ["Connect many VPCs in hub-and-spoke", "Transit Gateway"],
              ["Access S3 from private subnet without internet", "VPC Gateway Endpoint"],
              ["Connect on-premises to AWS quickly", "Site-to-Site VPN"],
              ["Dedicated private connection to AWS", "Direct Connect"],
              ["Troubleshoot network connectivity", "VPC Flow Logs"],
              ["Stateful firewall at instance level", "Security Group"],
              ["Stateless firewall at subnet level", "NACL"],
              ["Private DNS within VPC", "Route 53 Private Hosted Zone"],
              ["EC2 needs outbound internet but no inbound", "Private subnet + NAT Gateway"],
            ]}
          />
        </TopicSection>
      </div>
    </TopicLayout>
  );
}
