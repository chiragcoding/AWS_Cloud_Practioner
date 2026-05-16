import { TopicHeader } from "@/components/TopicHeader";
import {
  TopicSection,
  InfoCard,
  BulletList,
  ComparisonTable,
} from "@/components/TopicSection";
import { TopicLayout } from "@/components/TopicLayout";

const sections = [
  { id: "what-is-ec2", title: "What is EC2?" },
  { id: "instance-types", title: "Instance Types" },
  { id: "security-groups", title: "Security Groups" },
  { id: "purchasing-options", title: "Purchasing Options" },
  { id: "ssh-access", title: "SSH & Key Pairs" },
  { id: "iam-roles", title: "EC2 Instance Roles" },
  { id: "user-data", title: "User Data (Bootstrap)" },
  { id: "instance-lifecycle", title: "Instance Lifecycle" },
  { id: "hibernate", title: "EC2 Hibernate" },
  { id: "placement-groups", title: "Placement Groups" },
  { id: "networking", title: "ENI & Elastic IP" },
  { id: "ami", title: "AMI (Machine Images)" },
  { id: "exam-cheatsheet", title: "Exam Cheat Sheet" },
];

export default function EC2Page() {
  return (
    <TopicLayout topic="EC2">
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <TopicHeader
        icon="🖥️"
        title="EC2"
        subtitle="Elastic Compute Cloud - Virtual servers in the AWS cloud"
        sections={sections}
      />

      <TopicSection title="What is EC2?" id="what-is-ec2">
        <InfoCard>
          <p className="mb-3">
            EC2 = Elastic Compute Cloud. It&apos;s a virtual server (called an &quot;instance&quot;) in the AWS cloud.
            EC2 is <strong>Infrastructure as a Service (IaaS)</strong>.
          </p>
          <BulletList
            items={[
              "Rent virtual machines (EC2 instances)",
              "Store data on virtual drives (EBS)",
              "Distribute load across machines (ELB)",
              "Scale services using auto-scaling groups (ASG)",
              "No upfront hardware investment",
              "Launch servers in minutes, pay only for what you use",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="Instance Types" id="instance-types">
        <InfoCard title="Naming Convention">
          <p className="mb-2">Example: <code className="bg-[var(--color-background)] px-2 py-1 rounded">m5.2xlarge</code></p>
          <BulletList
            items={[
              "m = instance class (family)",
              "5 = generation (higher = newer/better)",
              "2xlarge = size within the instance class",
            ]}
          />
        </InfoCard>

        <ComparisonTable
          headers={["Family", "Optimized For", "Use Cases", "Example"]}
          rows={[
            ["General Purpose (t, m)", "Balanced compute/memory/network", "Web servers, code repos", "t2.micro (Free Tier)"],
            ["Compute Optimized (c)", "High-performance processors", "Batch processing, ML, gaming", "c5.large"],
            ["Memory Optimized (r, x, z)", "Large data sets in memory", "In-memory DBs (Redis), analytics", "r5.large"],
            ["Storage Optimized (i, d, h)", "High sequential read/write", "Data warehousing, HDFS, OLTP", "i3.large"],
            ["Accelerated (p, g, inf)", "Hardware accelerators (GPUs)", "ML training, video encoding", "p3.2xlarge"],
          ]}
        />

        <InfoCard variant="tip" title="Exam Tip">
          <p><strong>t2.micro = Free Tier</strong> (1 vCPU, 1 GB RAM, 750 hrs/month for 12 months)</p>
        </InfoCard>
      </TopicSection>

      <TopicSection title="Security Groups" id="security-groups">
        <InfoCard title="Virtual Firewall for EC2">
          <BulletList
            items={[
              "Control inbound (incoming) and outbound (outgoing) traffic",
              "Contain ALLOW rules only (no deny rules)",
              "Rules can reference IP addresses or other security groups",
              "Act at the INSTANCE level (not subnet level)",
              "STATEFUL: If traffic is allowed in, response is automatically allowed out",
              "All inbound traffic is BLOCKED by default",
              "All outbound traffic is ALLOWED by default",
              "Locked to a Region/VPC combination",
            ]}
          />
        </InfoCard>

        <ComparisonTable
          headers={["Port", "Protocol", "Use"]}
          rows={[
            ["22", "SSH", "Linux login"],
            ["21", "FTP", "File Transfer"],
            ["80", "HTTP", "Unsecured web"],
            ["443", "HTTPS", "Secured web"],
            ["3389", "RDP", "Windows login"],
          ]}
        />

        <InfoCard variant="important" title="Exam Tips">
          <BulletList
            items={[
              "\"Timeout\" error → Security Group issue (traffic blocked)",
              "\"Connection refused\" error → Application issue (app not running)",
              "You can reference other security groups (useful for load balancers)",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="Purchasing Options" id="purchasing-options">
        <ComparisonTable
          headers={["Option", "Discount", "Commitment", "Best For"]}
          rows={[
            ["On-Demand", "0%", "None", "Short, unpredictable workloads"],
            ["Reserved", "~72%", "1-3 years", "Steady-state, databases"],
            ["Savings Plans", "~72%", "1-3 years", "Flexible long-term"],
            ["Spot", "~90%", "None", "Fault-tolerant batch jobs"],
            ["Dedicated Hosts", "Varies", "None/Reserved", "Licensing, compliance"],
            ["Dedicated Instances", "Varies", "None", "Hardware isolation"],
            ["Capacity Reservations", "0%", "None", "Guaranteed capacity in AZ"],
          ]}
        />

        <InfoCard title="Key Details">
          <BulletList
            items={[
              "On-Demand: Pay per second (Linux) or per hour. Like a hotel — full price, leave anytime",
              "Reserved: Reserve specific instance type/region/OS. Like a long-term lease",
              "Savings Plans: Commit to $/hour usage. Flexible across size, OS, tenancy",
              "Spot: CHEAPEST! Can lose instance anytime (2-min warning). Like an auction",
              "Dedicated Hosts: Physical server for you. For per-socket/per-core licensing",
            ]}
          />
        </InfoCard>

        <InfoCard variant="important" title="Exam Scenarios">
          <BulletList
            items={[
              "\"Cheapest for fault-tolerant batch job\" → Spot Instances",
              "\"Steady database running 24/7\" → Reserved Instances",
              "\"Compliance requires dedicated hardware\" → Dedicated Hosts",
              "\"Short-term unpredictable workload\" → On-Demand",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="SSH & Key Pairs" id="ssh-access">
        <InfoCard>
          <BulletList
            items={[
              "Public Key → AWS keeps this (stored on instance)",
              "Private Key → You download this (.pem file)",
              "Linux/Mac: SSH using .pem file",
              "Windows: Use PuTTY or native SSH (Win 10+)",
              "EC2 Instance Connect: Browser-based SSH (no key needed, Amazon Linux 2)",
              "Never share your private key!",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="EC2 Instance Roles" id="iam-roles">
        <InfoCard variant="warning" title="NEVER put AWS credentials on an EC2 instance!">
          <BulletList
            items={[
              "Instead, attach an IAM Role to your EC2 instance",
              "Instance automatically gets temporary credentials",
              "Credentials are rotated automatically",
              "Much more secure than hardcoding keys",
            ]}
          />
        </InfoCard>
        <InfoCard variant="tip" title="Exam Tip">
          <p>&quot;How to give EC2 permissions to access other AWS services?&quot; → ALWAYS use IAM Roles.</p>
        </InfoCard>
      </TopicSection>

      <TopicSection title="User Data (Bootstrap)" id="user-data">
        <InfoCard>
          <BulletList
            items={[
              "A script that runs ONCE when the instance FIRST starts",
              "Used to automate boot tasks: installing updates, software, downloading files",
              "Runs with ROOT user privileges (sudo)",
              "Only runs at first launch (not on restart/reboot)",
            ]}
          />
          <div className="bg-[var(--color-background)] rounded p-3 font-mono text-xs overflow-x-auto mt-3">
            <pre>{`#!/bin/bash
yum update -y
yum install -y httpd
systemctl start httpd
echo "Hello from $(hostname)" > /var/www/html/index.html`}</pre>
          </div>
        </InfoCard>
      </TopicSection>

      <TopicSection title="Instance Lifecycle" id="instance-lifecycle">
        <InfoCard title="Instance States">
          <BulletList
            items={[
              "Pending → Instance is launching",
              "Running → Instance is running (you are being charged)",
              "Stopping → Preparing to stop",
              "Stopped → No charge for compute (EBS still charged)",
              "Shutting-down → Preparing to terminate",
              "Terminated → Instance is deleted (no charges)",
            ]}
          />
        </InfoCard>
        <InfoCard title="Billing">
          <BulletList
            items={[
              "NOT charged when instance is Stopped",
              "ARE charged for attached EBS volumes even when stopped",
              "Minimum billing: 1 minute, then per-second (Linux)",
              "Public IPv4 addresses: $0.005/IP/hour (since Feb 2024)",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="EC2 Hibernate" id="hibernate">
        <InfoCard>
          <BulletList
            items={[
              "RAM state is preserved (written to encrypted EBS root volume)",
              "Instance boots much faster (OS not restarted)",
              "Root EBS volume MUST be encrypted",
              "RAM size must be < 150 GB",
              "Cannot hibernate for more than 60 days",
              "Works with On-Demand, Reserved, and Spot instances",
            ]}
          />
        </InfoCard>
        <InfoCard variant="tip" title="Exam Tip">
          <p>&quot;Preserving RAM state&quot; → Hibernate</p>
        </InfoCard>
      </TopicSection>

      <TopicSection title="Placement Groups" id="placement-groups">
        <ComparisonTable
          headers={["Type", "Strategy", "Use Case", "Risk"]}
          rows={[
            ["Cluster", "Same rack, same AZ", "Low latency, HPC, Big Data", "All fail if rack fails"],
            ["Spread", "Different racks (max 7/AZ)", "Critical apps, high availability", "Limited to 7 per AZ"],
            ["Partition", "Groups of racks within AZ", "Hadoop, Cassandra, Kafka", "Partition-level failure"],
          ]}
        />
        <InfoCard variant="tip" title="Summary">
          <BulletList
            items={[
              "Cluster = Performance (same rack)",
              "Spread = Availability (different racks)",
              "Partition = Scale + Isolation (groups of racks)",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="ENI & Elastic IP" id="networking">
        <InfoCard title="Elastic Network Interface (ENI)">
          <BulletList
            items={[
              "Virtual network card attached to EC2",
              "Has: private IPv4, public IPv4, Elastic IP, security groups, MAC address",
              "Bound to a specific AZ",
              "Can be detached and moved to another instance (failover)",
            ]}
          />
        </InfoCard>
        <InfoCard title="Elastic IP">
          <BulletList
            items={[
              "Fixed public IPv4 address you own",
              "Can attach to one instance at a time",
              "Max 5 per account (can request more)",
              "CHARGED if NOT attached to a running instance",
              "Best practice: Avoid Elastic IPs, use DNS/Load Balancers instead",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="AMI (Machine Images)" id="ami">
        <InfoCard>
          <BulletList
            items={[
              "AMI = Template/image used to launch EC2 instances",
              "Contains: OS, pre-installed software, launch permissions, storage mapping",
              "Types: AWS-provided, Marketplace, Custom (you create)",
              "Region-specific (can copy across regions)",
              "Custom AMIs speed up boot time (software pre-installed)",
              "Process: Launch instance → Customize → Stop → Create AMI → Launch new instances",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="Exam Cheat Sheet" id="exam-cheatsheet">
        <ComparisonTable
          headers={["Scenario", "Answer"]}
          rows={[
            ["Cheapest option for fault-tolerant batch job", "Spot Instances"],
            ["Steady database running 24/7", "Reserved Instances"],
            ["Compliance requires dedicated hardware", "Dedicated Hosts"],
            ["Give EC2 access to S3", "IAM Role"],
            ["Timeout connecting to EC2", "Security Group issue"],
            ["Preserve RAM state", "Hibernate"],
            ["Fastest local storage", "Instance Store"],
            ["Fixed public IP", "Elastic IP (prefer Load Balancer)"],
            ["Pre-configured server template", "AMI"],
            ["Low latency between instances", "Cluster Placement Group"],
            ["High availability across racks", "Spread Placement Group"],
          ]}
        />
      </TopicSection>
    </div>
    </TopicLayout>
  );
}
