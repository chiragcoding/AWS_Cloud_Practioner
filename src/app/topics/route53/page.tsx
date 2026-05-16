import { TopicHeader } from "@/components/TopicHeader";
import {
  TopicSection,
  InfoCard,
  BulletList,
  ComparisonTable,
} from "@/components/TopicSection";
import { TopicLayout } from "@/components/TopicLayout";

const sections = [
  { id: "what-is-dns", title: "What is DNS?" },
  { id: "what-is-route53", title: "What is Route 53?" },
  { id: "hosted-zones", title: "Hosted Zones" },
  { id: "record-types", title: "Record Types" },
  { id: "routing-policies", title: "Routing Policies" },
  { id: "health-checks", title: "Health Checks" },
  { id: "domain-registration", title: "Domain Registration" },
  { id: "route53-vs-others", title: "Route 53 vs Other Services" },
  { id: "exam-scenarios", title: "Exam Scenarios" },
];

export default function Route53Page() {
  return (
    <TopicLayout topic="Route 53">
      <div className="p-6 md:p-10 max-w-4xl mx-auto">
        <TopicHeader
          icon="🌐"
          title="Route 53"
          subtitle="AWS DNS Service - Domain registration, routing, and health checking"
          sections={sections}
        />

        <TopicSection title="What is DNS?" id="what-is-dns">
          <InfoCard>
            <p className="mb-3">
              <strong>Domain Name System (DNS)</strong> — Translates human-friendly domain names
              (like www.example.com) into IP addresses (like 192.0.2.1) that computers use.
            </p>
            <BulletList
              items={[
                "DNS is like the \"phone book\" of the internet",
                "Translates: www.google.com → 142.250.80.46",
                "Hierarchical system: Root → TLD (.com) → Domain (google.com)",
                "Uses port 53 (that's why the service is called Route 53!)",
                "Key terms: Domain, Subdomain, Record, TTL, Name Server",
              ]}
            />
          </InfoCard>
          <InfoCard variant="tip" title="Memory Aid">
            <p>&quot;Route 53 = Route + Port 53 (DNS port)&quot; — The name comes from the DNS port number and the concept of routing traffic.</p>
          </InfoCard>
        </TopicSection>

        <TopicSection title="What is Route 53?" id="what-is-route53">
          <InfoCard title="Route 53 Overview">
            <p className="mb-3">
              <strong>Highly available, scalable, fully managed DNS web service</strong> — Combines
              domain registration, DNS routing, and health checking in one service.
            </p>
            <BulletList
              items={[
                "100% availability SLA (the only AWS service with this guarantee!)",
                "Three main functions: Domain Registration, DNS Routing, Health Checking",
                "Global service (not region-specific)",
                "Supports both public and private DNS",
                "Can route traffic to AWS resources and external endpoints",
                "Integrates with ELB, CloudFront, S3, EC2, and more",
              ]}
            />
          </InfoCard>

          <InfoCard variant="important" title="Key Fact">
            <p>Route 53 is the <strong>only AWS service with a 100% availability SLA</strong>. This is a common exam question!</p>
          </InfoCard>
        </TopicSection>

        <TopicSection title="Hosted Zones" id="hosted-zones">
          <InfoCard title="What is a Hosted Zone?">
            <p className="mb-3">
              A container for DNS records that defines how traffic is routed for a domain and its subdomains.
            </p>
            <BulletList
              items={[
                "Public Hosted Zone: Routes traffic on the internet (e.g., app.example.com)",
                "Private Hosted Zone: Routes traffic within a VPC (internal DNS)",
                "Cost: $0.50 per hosted zone per month",
                "Each hosted zone has a set of Name Servers (NS records)",
              ]}
            />
          </InfoCard>

          <InfoCard title="Public vs Private Hosted Zones">
            <ComparisonTable
              headers={["Feature", "Public Hosted Zone", "Private Hosted Zone"]}
              rows={[
                ["Accessible from", "Internet (anyone)", "Within VPC(s) only"],
                ["Use case", "Public websites, APIs", "Internal services, microservices"],
                ["Example", "www.myapp.com", "db.internal.myapp.com"],
                ["Resolution", "Public DNS resolvers", "VPC DNS resolver"],
              ]}
            />
          </InfoCard>
        </TopicSection>

        <TopicSection title="Record Types" id="record-types">
          <InfoCard title="Common DNS Record Types">
            <ComparisonTable
              headers={["Record Type", "Purpose", "Example"]}
              rows={[
                ["A", "Maps domain to IPv4 address", "example.com → 1.2.3.4"],
                ["AAAA", "Maps domain to IPv6 address", "example.com → 2001:db8::1"],
                ["CNAME", "Maps domain to another domain", "www.example.com → example.com"],
                ["Alias", "Maps domain to AWS resource (Route 53 specific)", "example.com → ALB DNS name"],
                ["NS", "Name servers for the hosted zone", "Delegates DNS authority"],
                ["MX", "Mail server records", "Email routing"],
                ["TXT", "Text records for verification", "Domain ownership proof"],
              ]}
            />
          </InfoCard>

          <InfoCard variant="important" title="CNAME vs Alias Record">
            <ComparisonTable
              headers={["Feature", "CNAME", "Alias"]}
              rows={[
                ["Works for root domain?", "NO (can't use for example.com)", "YES (works for root/apex)"],
                ["Points to", "Any hostname", "AWS resources only"],
                ["Cost", "Charged for queries", "FREE for AWS resources"],
                ["Type", "Standard DNS", "Route 53 extension"],
              ]}
            />
            <div className="mt-3">
              <p className="text-[13px] text-slate-600"><strong>Exam tip:</strong> If asked about mapping a root/apex domain (example.com) to an AWS resource → Always choose Alias record (CNAME won&apos;t work for root domains).</p>
            </div>
          </InfoCard>
        </TopicSection>

        <TopicSection title="Routing Policies" id="routing-policies">
          <InfoCard title="Route 53 Routing Policies">
            <ComparisonTable
              headers={["Policy", "How it Works", "Use Case"]}
              rows={[
                ["Simple", "Returns one or more values randomly", "Single resource, no health checks"],
                ["Weighted", "Routes % of traffic to each resource", "A/B testing, gradual deployments"],
                ["Latency-based", "Routes to lowest latency region", "Global apps, best user experience"],
                ["Failover", "Routes to primary, switches to secondary on failure", "Active-passive disaster recovery"],
                ["Geolocation", "Routes based on user's geographic location", "Content localization, compliance"],
                ["Geoproximity", "Routes based on geographic distance (with bias)", "Shift traffic between regions"],
                ["Multi-value", "Returns multiple healthy IPs", "Simple load balancing with health checks"],
              ]}
            />
          </InfoCard>

          <InfoCard variant="tip" title="Exam Tips for Routing Policies">
            <BulletList
              items={[
                "\"Lowest latency\" → Latency-based routing",
                "\"A/B testing\" or \"send 10% to new version\" → Weighted routing",
                "\"Users in Europe see European content\" → Geolocation routing",
                "\"Disaster recovery with failover\" → Failover routing",
                "\"Distribute across healthy endpoints\" → Multi-value routing",
              ]}
            />
          </InfoCard>
        </TopicSection>

        <TopicSection title="Health Checks" id="health-checks">
          <InfoCard title="Route 53 Health Checks">
            <BulletList
              items={[
                "Monitor the health of your endpoints (EC2, ALB, etc.)",
                "Automated DNS failover when endpoint is unhealthy",
                "Types: HTTP, HTTPS, TCP health checks",
                "Can monitor: Endpoints, other health checks (calculated), CloudWatch alarms",
                "Health checkers are distributed globally (~15 locations)",
                "Endpoint is healthy if ≥18% of checkers report healthy",
                "Interval: Every 30 seconds (default) or 10 seconds (extra cost)",
              ]}
            />
          </InfoCard>

          <InfoCard variant="warning" title="Important Note">
            <p>Health checks can only monitor <strong>public endpoints</strong>. For private resources within a VPC, use CloudWatch Alarms + Health Checks (calculated health checks).</p>
          </InfoCard>
        </TopicSection>

        <TopicSection title="Domain Registration" id="domain-registration">
          <InfoCard title="Registering Domains with Route 53">
            <BulletList
              items={[
                "Route 53 is also a domain registrar (buy domains directly)",
                "Supports generic TLDs (.com, .org, .net) and country TLDs (.co.uk, .in)",
                "Auto-renew available to prevent accidental expiration",
                "Domain lock to prevent unauthorized transfers",
                "Can transfer domains TO Route 53 from other registrars",
                "Can use Route 53 DNS without registering domain there",
              ]}
            />
          </InfoCard>
        </TopicSection>

        <TopicSection title="Route 53 vs Other Services" id="route53-vs-others">
          <ComparisonTable
            headers={["Service", "Purpose", "When to Use"]}
            rows={[
              ["Route 53", "DNS routing & domain management", "Domain resolution, traffic routing"],
              ["CloudFront", "CDN (content delivery)", "Cache content at edge locations"],
              ["Global Accelerator", "Network layer acceleration", "Fixed IPs, TCP/UDP acceleration"],
              ["ELB", "Load balancing within a region", "Distribute traffic to targets"],
            ]}
          />
          <InfoCard variant="tip" title="Key Distinction">
            <p><strong>Route 53 routes users to the right region/endpoint. ELB distributes traffic within a region.</strong> They often work together: Route 53 → ELB → EC2 instances.</p>
          </InfoCard>
        </TopicSection>

        <TopicSection title="Exam Scenarios" id="exam-scenarios">
          <ComparisonTable
            headers={["Scenario", "Answer"]}
            rows={[
              ["Map root domain to an ALB", "Route 53 Alias record"],
              ["Route users to the closest region", "Latency-based routing"],
              ["Disaster recovery with automatic failover", "Failover routing policy + health checks"],
              ["Send 90% traffic to v1, 10% to v2", "Weighted routing policy"],
              ["Users in EU must access EU servers (compliance)", "Geolocation routing"],
              ["100% availability DNS service", "Route 53 (only service with 100% SLA)"],
              ["Register a domain name on AWS", "Route 53 domain registration"],
              ["Private DNS for internal microservices", "Route 53 Private Hosted Zone"],
              ["CNAME for root domain doesn't work", "Use Alias record instead"],
              ["Monitor endpoint health and auto-failover", "Route 53 Health Checks"],
            ]}
          />
        </TopicSection>
      </div>
    </TopicLayout>
  );
}
