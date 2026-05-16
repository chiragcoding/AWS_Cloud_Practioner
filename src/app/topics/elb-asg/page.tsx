import { TopicHeader } from "@/components/TopicHeader";
import {
  TopicSection,
  InfoCard,
  BulletList,
  ComparisonTable,
} from "@/components/TopicSection";
import { TopicLayout } from "@/components/TopicLayout";

const sections = [
  { id: "why-needed", title: "Why Load Balancers & Auto Scaling?" },
  { id: "scalability", title: "Scalability Concepts" },
  { id: "elb-overview", title: "ELB Overview" },
  { id: "lb-types", title: "Types of Load Balancers" },
  { id: "elb-features", title: "ELB Features" },
  { id: "asg-overview", title: "Auto Scaling Groups" },
  { id: "scaling-policies", title: "Scaling Policies" },
  { id: "asg-features", title: "ASG Features" },
  { id: "together", title: "ELB + ASG Together" },
  { id: "exam-tips", title: "Exam Cheat Sheet" },
];

export default function ELBASGPage() {
  return (
    <TopicLayout topic="ELB & ASG">
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <TopicHeader
        icon="⚖️"
        title="ELB & ASG"
        subtitle="Elastic Load Balancing & Auto Scaling Groups - Distribute traffic and scale automatically"
        sections={sections}
      />

      <TopicSection title="Why Load Balancers & Auto Scaling?" id="why-needed">
        <InfoCard title="The Problem">
          <BulletList
            items={[
              "Single server = Single point of failure",
              "Traffic spikes overwhelm one server → slow response or crash",
              "Traffic drops = paying for idle servers",
              "No easy maintenance without downtime",
            ]}
          />
        </InfoCard>
        <InfoCard title="The Solution">
          <BulletList
            items={[
              "Load Balancer → Distributes traffic across multiple servers",
              "Auto Scaling → Automatically adds/removes servers based on demand",
            ]}
          />
        </InfoCard>
        <InfoCard variant="tip" title="Analogy">
          <p><strong>Load Balancer</strong> = The host who seats customers at different tables</p>
          <p><strong>Auto Scaling</strong> = The manager who calls in more waiters when busy</p>
        </InfoCard>
      </TopicSection>

      <TopicSection title="Scalability Concepts" id="scalability">
        <ComparisonTable
          headers={["Type", "How", "Example", "Common For"]}
          rows={[
            ["Vertical (Scale Up)", "Increase SIZE of instance", "t2.micro → t2.2xlarge", "Databases (RDS)"],
            ["Horizontal (Scale Out)", "Increase NUMBER of instances", "1 → 5 → 20 servers", "Web apps, distributed systems"],
          ]}
        />
        <InfoCard title="High Availability">
          <BulletList
            items={[
              "Running your app in at least 2 Availability Zones",
              "If one AZ goes down, the other keeps serving traffic",
              "Goal: survive a data center loss",
              "ELB + ASG across multiple AZs = High Availability",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="ELB Overview" id="elb-overview">
        <InfoCard title="What is ELB?">
          <BulletList
            items={[
              "A MANAGED load balancer by AWS",
              "AWS handles upgrades, maintenance, high availability",
              "You just configure it — AWS manages the infrastructure",
              "Integrated with EC2, ECS, ACM, CloudWatch, Route 53, WAF",
              "Costs more than DIY but saves enormous operational effort",
            ]}
          />
        </InfoCard>
        <InfoCard title="Key Concepts">
          <BulletList
            items={[
              "Listeners: Rules that check for connection requests (port + protocol)",
              "Target Group: Group of resources (EC2, Lambda, IP) that receive traffic",
              "Health Check: ELB pings targets to verify they're healthy",
              "Unhealthy targets stop receiving traffic automatically",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="Types of Load Balancers" id="lb-types">
        <ComparisonTable
          headers={["Type", "Layer", "Protocol", "Key Feature"]}
          rows={[
            ["Application (ALB)", "Layer 7", "HTTP, HTTPS, WebSocket", "URL/host/header routing"],
            ["Network (NLB)", "Layer 4", "TCP, UDP, TLS", "Ultra-high performance, static IP"],
            ["Gateway (GWLB)", "Layer 3", "IP packets", "Security appliances (firewalls)"],
            ["Classic (CLB)", "Layer 4 & 7", "TCP, HTTP", "DEPRECATED — don't use"],
          ]}
        />

        <InfoCard title="Application Load Balancer (ALB) — Layer 7">
          <BulletList
            items={[
              "Best for HTTP/HTTPS/WebSocket traffic",
              "Can route based on: URL path, hostname, query string, headers",
              "Great for microservices and container-based apps (ECS)",
              "Has a fixed hostname (xxx.region.elb.amazonaws.com)",
              "Client IP available in X-Forwarded-For header",
              "Can do SSL/TLS termination",
              "Supports multiple target groups",
            ]}
          />
        </InfoCard>

        <InfoCard title="Network Load Balancer (NLB) — Layer 4">
          <BulletList
            items={[
              "Best for TCP/UDP/TLS traffic",
              "ULTRA HIGH PERFORMANCE: millions of requests/sec",
              "Ultra-low latency (~100ms vs ~400ms for ALB)",
              "Has ONE static IP per AZ (can assign Elastic IP)",
              "Use when you need: extreme performance, static IPs, TCP/UDP",
              "NOT included in AWS Free Tier",
            ]}
          />
        </InfoCard>

        <InfoCard title="Gateway Load Balancer (GWLB) — Layer 3">
          <BulletList
            items={[
              "Route ALL traffic through security appliances BEFORE reaching your app",
              "Use case: Firewalls, IDS/IPS, Deep Packet Inspection",
              "Traffic → GWLB → Security appliances → Your app",
              "Uses GENEVE protocol on port 6081",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="ELB Features" id="elb-features">
        <InfoCard title="Sticky Sessions">
          <BulletList
            items={[
              "Same client always goes to same instance",
              "Uses a cookie (application or duration-based)",
              "Available on ALB and CLB",
              "Can cause imbalanced load",
            ]}
          />
        </InfoCard>

        <InfoCard title="Cross-Zone Load Balancing">
          <BulletList
            items={[
              "Distributes traffic evenly across ALL instances in ALL AZs",
              "Without it: each AZ gets equal share regardless of instance count",
              "ALB: Always on, no extra charges",
              "NLB & GWLB: Disabled by default, charges apply if enabled",
            ]}
          />
        </InfoCard>

        <InfoCard title="SSL/TLS Termination">
          <BulletList
            items={[
              "ELB handles SSL/TLS encryption/decryption",
              "Upload cert to ELB or use AWS Certificate Manager (ACM)",
              "Client ↔ ELB: encrypted (HTTPS)",
              "ELB ↔ EC2: can be HTTP (unencrypted) inside VPC",
              "SNI: Multiple SSL certs on one LB (ALB & NLB only, NOT CLB)",
            ]}
          />
        </InfoCard>

        <InfoCard title="Connection Draining">
          <BulletList
            items={[
              "When instance is being deregistered/unhealthy",
              "ELB gives time to complete in-flight requests (default 300s)",
              "New requests go to other healthy instances",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="Auto Scaling Groups" id="asg-overview">
        <InfoCard title="What is ASG?">
          <BulletList
            items={[
              "Automatically scales EC2 instances based on demand",
              "Scale OUT (add) when load increases, Scale IN (remove) when load decreases",
              "Ensures minimum instances always running",
              "Ensures maximum doesn't exceed budget",
              "Auto-registers new instances with ELB",
              "Replaces unhealthy instances automatically (self-healing!)",
              "FREE service (you only pay for EC2 instances launched)",
            ]}
          />
        </InfoCard>

        <InfoCard title="ASG Configuration">
          <BulletList
            items={[
              "Minimum Capacity: The LEAST number of instances (always running)",
              "Desired Capacity: The number ASG tries to maintain right now",
              "Maximum Capacity: The MOST instances ASG can scale to",
              "Example: Min: 2, Desired: 4, Max: 10",
            ]}
          />
        </InfoCard>

        <InfoCard title="Launch Template">
          <BulletList
            items={[
              "Defines WHAT to launch: AMI, instance type, key pair, security groups, EBS, user data, IAM role",
              "Launch Template = newer, recommended approach",
              "Launch Configuration = legacy (can't edit, must recreate)",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="Scaling Policies" id="scaling-policies">
        <ComparisonTable
          headers={["Policy Type", "How It Works", "Best For"]}
          rows={[
            ["Manual", "You change desired capacity manually", "Known events (Black Friday)"],
            ["Simple Scaling", "Single CloudWatch alarm triggers action", "Basic scaling needs"],
            ["Step Scaling", "Different actions based on alarm severity", "Granular response to load"],
            ["Target Tracking", "Set target metric, ASG maintains it", "Most common & easiest"],
            ["Scheduled", "Scale at specific times", "Predictable patterns"],
            ["Predictive (ML)", "ML forecasts and pre-provisions", "Cyclical patterns"],
          ]}
        />

        <InfoCard title="Target Tracking (Most Popular)">
          <BulletList
            items={[
              "\"I want average CPU to stay at 40%\"",
              "ASG automatically figures out how many instances needed",
              "Like a thermostat — set temperature, system adjusts",
              "Common targets: CPU utilization, Network In/Out, Request count per target",
            ]}
          />
        </InfoCard>

        <InfoCard title="Predictive Scaling">
          <BulletList
            items={[
              "Uses ML to analyze historical load patterns",
              "Provisions instances AHEAD of time",
              "Forecast-based — scales before traffic arrives",
              "Continuously learns and improves predictions",
            ]}
          />
        </InfoCard>

        <InfoCard variant="tip" title="Exam Tip">
          <BulletList
            items={[
              "Predictive = ML, forecast, ahead of time",
              "Target Tracking = set a target, ASG maintains it",
              "Scheduled = known time patterns",
              "Step/Simple = CloudWatch alarm triggers",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="ASG Features" id="asg-features">
        <InfoCard title="Cooldown Period">
          <BulletList
            items={[
              "After scaling, ASG waits before doing another action",
              "Default: 300 seconds (5 minutes)",
              "Prevents rapid scaling up and down (thrashing)",
            ]}
          />
        </InfoCard>

        <InfoCard title="Instance Refresh">
          <BulletList
            items={[
              "Update all instances with new launch template",
              "Set minimum healthy percentage (e.g., 90%)",
              "ASG terminates and replaces instances gradually",
              "Use case: deploying new AMI to all instances",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="ELB + ASG Together" id="together">
        <InfoCard title="How They Work Together">
          <BulletList
            items={[
              "1. User sends request → hits ELB",
              "2. ELB checks health of all targets",
              "3. ELB routes to healthy instance",
              "4. If load increases → CloudWatch alarm triggers",
              "5. ASG launches new instance(s)",
              "6. New instance auto-registers with ELB target group",
              "7. ELB starts sending traffic to new instance",
              "8. If load decreases → ASG terminates instance(s)",
              "9. ELB stops sending traffic (connection draining first)",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="Exam Cheat Sheet" id="exam-tips">
        <ComparisonTable
          headers={["Scenario", "Answer"]}
          rows={[
            ["HTTP/HTTPS routing, microservices", "ALB"],
            ["Path-based or host-based routing", "ALB"],
            ["Extreme performance / low latency", "NLB"],
            ["Static IP / Elastic IP needed", "NLB"],
            ["TCP/UDP protocol", "NLB"],
            ["Millions of requests per second", "NLB"],
            ["3rd party security appliances", "GWLB"],
            ["Firewall / IDS / IPS", "GWLB"],
            ["Inspect all network traffic", "GWLB"],
          ]}
        />

        <InfoCard variant="important" title="Key Points">
          <BulletList
            items={[
              "ELB is a MANAGED service (AWS handles maintenance, HA, scaling)",
              "ASG is FREE (you pay for EC2 instances only)",
              "ASG replaces unhealthy instances automatically",
              "Target Tracking = easiest/most common scaling policy",
              "Predictive Scaling = uses ML to forecast",
              "NLB has static IP, ALB does not",
              "SNI allows multiple SSL certs (ALB & NLB only)",
            ]}
          />
        </InfoCard>

        <InfoCard variant="warning" title="Common Exam Traps">
          <BulletList
            items={[
              "\"Use CLB for new apps\" → Wrong! CLB is deprecated",
              "\"ASG costs money\" → Wrong! ASG itself is free",
              "\"ALB can have static IP\" → Wrong! Only NLB has static IP",
              "\"Manually register instances with ELB\" → Wrong! ASG does it automatically",
              "\"ELB only works in one AZ\" → Wrong! ELB spans multiple AZs",
            ]}
          />
        </InfoCard>
      </TopicSection>
    </div>
    </TopicLayout>
  );
}
