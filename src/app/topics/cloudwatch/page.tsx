import { TopicHeader } from "@/components/TopicHeader";
import {
  TopicSection,
  InfoCard,
  BulletList,
  ComparisonTable,
} from "@/components/TopicSection";
import { TopicLayout } from "@/components/TopicLayout";

const sections = [
  { id: "what-is-cloudwatch", title: "What is CloudWatch?" },
  { id: "metrics", title: "CloudWatch Metrics" },
  { id: "alarms", title: "CloudWatch Alarms" },
  { id: "logs", title: "CloudWatch Logs" },
  { id: "events-eventbridge", title: "EventBridge (CloudWatch Events)" },
  { id: "dashboards", title: "CloudWatch Dashboards" },
  { id: "related-services", title: "Related Monitoring Services" },
  { id: "exam-scenarios", title: "Exam Scenarios" },
];

export default function CloudWatchPage() {
  return (
    <TopicLayout topic="CloudWatch">
      <div className="p-6 md:p-10 max-w-4xl mx-auto">
        <TopicHeader
          icon="📊"
          title="CloudWatch"
          subtitle="AWS Monitoring & Observability - Metrics, Alarms, Logs, and Events"
          sections={sections}
        />

        <TopicSection title="What is CloudWatch?" id="what-is-cloudwatch">
          <InfoCard>
            <p className="mb-3">
              <strong>Amazon CloudWatch</strong> — A monitoring and observability service that collects
              metrics, logs, and events from AWS resources and applications.
            </p>
            <BulletList
              items={[
                "Monitors AWS resources and applications in real-time",
                "Collects metrics (CPU, network, disk, custom metrics)",
                "Sets alarms to trigger actions (auto-scaling, notifications)",
                "Stores and analyzes log data",
                "Creates dashboards for visualization",
                "Regional service (metrics are per-region)",
              ]}
            />
          </InfoCard>
          <InfoCard variant="tip" title="Memory Aid">
            <p>&quot;CloudWatch = Watch your cloud&quot; — It&apos;s your monitoring dashboard for everything happening in AWS. Think of it as the &quot;eyes&quot; of your infrastructure.</p>
          </InfoCard>
        </TopicSection>

        <TopicSection title="CloudWatch Metrics" id="metrics">
          <InfoCard title="What are Metrics?">
            <p className="mb-3">
              Metrics are time-ordered data points that represent the behavior of your resources.
            </p>
            <BulletList
              items={[
                "Every AWS service sends metrics to CloudWatch automatically",
                "Metric = variable to monitor (CPUUtilization, NetworkIn, etc.)",
                "Metrics belong to namespaces (AWS/EC2, AWS/RDS, etc.)",
                "Dimensions: Attributes to filter (InstanceId, InstanceType)",
                "Timestamps: Each data point has a time",
                "Retention: 1-minute data for 15 days, 5-minute for 63 days, 1-hour for 455 days",
              ]}
            />
          </InfoCard>

          <InfoCard title="Important EC2 Metrics">
            <ComparisonTable
              headers={["Metric", "What it Measures", "Note"]}
              rows={[
                ["CPUUtilization", "CPU usage percentage", "Most common metric"],
                ["NetworkIn / NetworkOut", "Network traffic", "Bytes in/out"],
                ["DiskReadOps / DiskWriteOps", "Disk I/O operations", "Instance store only"],
                ["StatusCheckFailed", "Instance health", "System + Instance checks"],
              ]}
            />
          </InfoCard>

          <InfoCard variant="important" title="RAM is NOT a Default Metric!">
            <BulletList
              items={[
                "Memory (RAM) utilization is NOT collected by default",
                "You need the CloudWatch Agent installed on the instance",
                "The agent can also collect disk space, custom app metrics",
                "This is a very common exam question!",
              ]}
            />
          </InfoCard>

          <InfoCard title="Custom Metrics">
            <BulletList
              items={[
                "You can publish your own metrics to CloudWatch",
                "Use the PutMetricData API",
                "Examples: Memory usage, active users, application errors",
                "Resolution: Standard (1 minute) or High Resolution (1 second)",
                "Custom metrics cost extra",
              ]}
            />
          </InfoCard>
        </TopicSection>

        <TopicSection title="CloudWatch Alarms" id="alarms">
          <InfoCard title="What are Alarms?">
            <p className="mb-3">
              Alarms watch a single metric and trigger actions when a threshold is breached.
            </p>
            <BulletList
              items={[
                "Three states: OK, ALARM, INSUFFICIENT_DATA",
                "Trigger actions based on metric thresholds",
                "Period: How long the threshold must be breached",
                "Evaluation periods: Number of consecutive periods",
              ]}
            />
          </InfoCard>

          <InfoCard title="Alarm Actions">
            <ComparisonTable
              headers={["Action Type", "What it Does", "Example"]}
              rows={[
                ["EC2 Action", "Stop, terminate, reboot, recover instance", "Stop idle instances to save cost"],
                ["Auto Scaling", "Scale in or scale out", "Add instances when CPU > 80%"],
                ["SNS Notification", "Send email, SMS, trigger Lambda", "Alert team when errors spike"],
              ]}
            />
          </InfoCard>

          <InfoCard title="Billing Alarms">
            <BulletList
              items={[
                "Monitor your estimated AWS charges",
                "Only available in us-east-1 region",
                "Set threshold: Alert when bill exceeds $X",
                "Best practice: Set up billing alarms immediately!",
                "Alternative: AWS Budgets (more features, more flexible)",
              ]}
            />
          </InfoCard>

          <InfoCard variant="tip" title="Exam Tip">
            <p>&quot;CloudWatch Alarm → SNS → Lambda&quot; — This is a very common pattern. Alarm triggers SNS topic, which invokes a Lambda function for automated remediation.</p>
          </InfoCard>
        </TopicSection>

        <TopicSection title="CloudWatch Logs" id="logs">
          <InfoCard title="What are CloudWatch Logs?">
            <p className="mb-3">
              A centralized service to store, monitor, and analyze log data from AWS services and applications.
            </p>
            <BulletList
              items={[
                "Collect logs from: EC2, Lambda, CloudTrail, Route 53, ECS, etc.",
                "Log Groups: Collection of log streams (usually one per application)",
                "Log Streams: Sequence of events from a single source",
                "Retention: 1 day to 10 years (or never expire)",
                "Can export to S3 or stream to ElasticSearch",
                "Log Insights: Query and analyze logs with a purpose-built query language",
              ]}
            />
          </InfoCard>

          <InfoCard title="CloudWatch Logs Sources">
            <ComparisonTable
              headers={["Source", "How Logs Get to CloudWatch"]}
              rows={[
                ["EC2 Instances", "CloudWatch Agent (must be installed)"],
                ["Lambda Functions", "Automatic (built-in integration)"],
                ["API Gateway", "Automatic (enable logging)"],
                ["CloudTrail", "Automatic (API call logs)"],
                ["Route 53", "DNS query logs"],
                ["ECS / Fargate", "Container logs via awslogs driver"],
                ["VPC Flow Logs", "Network traffic logs"],
              ]}
            />
          </InfoCard>

          <InfoCard variant="important" title="CloudWatch Agent">
            <BulletList
              items={[
                "Required for EC2 to send logs AND custom metrics",
                "Collects: System-level metrics (RAM, disk, processes) + log files",
                "Must have correct IAM permissions (IAM Role on EC2)",
                "Works on both EC2 and on-premises servers",
              ]}
            />
          </InfoCard>
        </TopicSection>

        <TopicSection title="EventBridge (CloudWatch Events)" id="events-eventbridge">
          <InfoCard title="What is EventBridge?">
            <p className="mb-3">
              <strong>Amazon EventBridge</strong> (formerly CloudWatch Events) — A serverless event bus
              that connects applications using events.
            </p>
            <BulletList
              items={[
                "React to events happening in your AWS environment",
                "Schedule: Cron jobs (e.g., trigger Lambda every hour)",
                "Event Pattern: React to service events (e.g., EC2 instance terminated)",
                "Targets: Lambda, SQS, SNS, Step Functions, and more",
                "Can receive events from SaaS partners (Zendesk, Datadog, etc.)",
                "Schema Registry: Discover and manage event schemas",
              ]}
            />
          </InfoCard>

          <InfoCard title="Common EventBridge Patterns">
            <ComparisonTable
              headers={["Event Source", "Event", "Target Action"]}
              rows={[
                ["EC2", "Instance state change", "SNS notification"],
                ["S3", "Object uploaded", "Lambda processing"],
                ["Schedule", "Every 1 hour", "Lambda cleanup job"],
                ["IAM", "Root user sign-in", "SNS alert to admin"],
                ["CodePipeline", "Pipeline failed", "SNS notification"],
              ]}
            />
          </InfoCard>

          <InfoCard variant="tip" title="Exam Tip">
            <p>&quot;Schedule a task&quot; or &quot;React to AWS events&quot; → EventBridge. It&apos;s the evolution of CloudWatch Events with more features and third-party integrations.</p>
          </InfoCard>
        </TopicSection>

        <TopicSection title="CloudWatch Dashboards" id="dashboards">
          <InfoCard title="CloudWatch Dashboards">
            <BulletList
              items={[
                "Custom visualizations of your metrics",
                "Global: Can include metrics from multiple regions",
                "Auto-refresh: Configurable refresh intervals",
                "Shareable: Can share with people without AWS accounts",
                "Pricing: 3 dashboards free (up to 50 metrics each), then $3/month per dashboard",
              ]}
            />
          </InfoCard>
        </TopicSection>

        <TopicSection title="Related Monitoring Services" id="related-services">
          <ComparisonTable
            headers={["Service", "Purpose", "Exam Keyword"]}
            rows={[
              ["CloudWatch", "Metrics, alarms, logs, dashboards", "Monitor performance"],
              ["CloudTrail", "API call auditing (who did what)", "Audit, compliance, governance"],
              ["X-Ray", "Distributed tracing for microservices", "Debug, trace, latency analysis"],
              ["AWS Config", "Track resource configuration changes", "Compliance, configuration history"],
              ["Trusted Advisor", "Best practice recommendations", "Cost, security, performance checks"],
              ["Health Dashboard", "AWS service health status", "Service outages, maintenance"],
              ["GuardDuty", "Threat detection", "Malicious activity, anomalies"],
            ]}
          />

          <InfoCard variant="important" title="CloudWatch vs CloudTrail vs Config">
            <ComparisonTable
              headers={["", "CloudWatch", "CloudTrail", "AWS Config"]}
              rows={[
                ["What", "Performance metrics & logs", "API call history", "Resource configuration"],
                ["Question", "How is it performing?", "Who did what?", "How is it configured?"],
                ["Example", "CPU at 90%", "User deleted S3 bucket", "Security group changed"],
              ]}
            />
          </InfoCard>
        </TopicSection>

        <TopicSection title="Exam Scenarios" id="exam-scenarios">
          <ComparisonTable
            headers={["Scenario", "Answer"]}
            rows={[
              ["Monitor CPU utilization of EC2", "CloudWatch Metrics (built-in)"],
              ["Monitor RAM usage of EC2", "CloudWatch Agent (custom metric)"],
              ["Alert when CPU > 80%", "CloudWatch Alarm → SNS"],
              ["Auto-scale based on metrics", "CloudWatch Alarm → Auto Scaling"],
              ["Centralize application logs", "CloudWatch Logs"],
              ["Schedule a Lambda every hour", "EventBridge (scheduled rule)"],
              ["React to EC2 state changes", "EventBridge (event pattern)"],
              ["Debug latency in microservices", "AWS X-Ray"],
              ["Who deleted my S3 bucket?", "CloudTrail (not CloudWatch)"],
              ["Track security group changes over time", "AWS Config"],
              ["Reduce costs by stopping idle instances", "CloudWatch Alarm → EC2 Stop action"],
              ["Monitor estimated AWS bill", "CloudWatch Billing Alarm (us-east-1)"],
            ]}
          />
        </TopicSection>
      </div>
    </TopicLayout>
  );
}
