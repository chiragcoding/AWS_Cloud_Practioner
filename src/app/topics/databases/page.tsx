import { TopicHeader } from "@/components/TopicHeader";
import {
  TopicSection,
  InfoCard,
  BulletList,
  ComparisonTable,
} from "@/components/TopicSection";
import { TopicLayout } from "@/components/TopicLayout";

const sections = [
  { id: "overview", title: "Databases on AWS" },
  { id: "rds", title: "Amazon RDS" },
  { id: "aurora", title: "Amazon Aurora" },
  { id: "dynamodb", title: "Amazon DynamoDB" },
  { id: "elasticache", title: "ElastiCache" },
  { id: "redshift", title: "Amazon Redshift" },
  { id: "other-databases", title: "Other Database Services" },
  { id: "choosing", title: "Choosing the Right Database" },
  { id: "exam-scenarios", title: "Exam Scenarios" },
];

export default function DatabasesPage() {
  return (
    <TopicLayout topic="Databases">
      <div className="p-6 md:p-10 max-w-4xl mx-auto">
        <TopicHeader
          icon="🗄️"
          title="Databases"
          subtitle="AWS Database Services - From relational to NoSQL, caching to warehousing"
          sections={sections}
        />

        <TopicSection title="Databases on AWS" id="overview">
          <InfoCard>
            <p className="mb-3">
              AWS offers <strong>purpose-built databases</strong> for different use cases.
              Instead of one-size-fits-all, you pick the right tool for the job.
            </p>
            <BulletList
              items={[
                "Relational (SQL): Structured data with relationships — RDS, Aurora",
                "Key-Value / NoSQL: Flexible schema, high performance — DynamoDB",
                "In-Memory / Caching: Microsecond latency — ElastiCache",
                "Data Warehouse: Analytics on massive datasets — Redshift",
                "Document: JSON-like documents — DocumentDB (MongoDB compatible)",
                "Graph: Relationships between data — Neptune",
                "Time Series: IoT, metrics — Timestream",
                "Ledger: Immutable, verifiable history — QLDB",
              ]}
            />
          </InfoCard>
          <InfoCard variant="tip" title="Memory Aid">
            <p>&quot;Right tool for the right job&quot; — AWS has 15+ database services. The exam tests whether you can pick the correct one for a scenario.</p>
          </InfoCard>
        </TopicSection>

        <TopicSection title="Amazon RDS" id="rds">
          <InfoCard title="What is RDS?">
            <p className="mb-3">
              <strong>Relational Database Service</strong> — A managed service for relational databases.
              AWS handles provisioning, patching, backups, and recovery.
            </p>
            <BulletList
              items={[
                "Supports: PostgreSQL, MySQL, MariaDB, Oracle, SQL Server, IBM Db2",
                "Managed service: You CANNOT SSH into the instance",
                "Automated backups, point-in-time recovery",
                "Multi-AZ for high availability (synchronous standby replica)",
                "Read Replicas for read scalability (asynchronous replication)",
                "Storage auto-scaling when running low on space",
              ]}
            />
          </InfoCard>

          <InfoCard title="RDS Multi-AZ vs Read Replicas">
            <ComparisonTable
              headers={["Feature", "Multi-AZ", "Read Replicas"]}
              rows={[
                ["Purpose", "High Availability (failover)", "Read Scalability (performance)"],
                ["Replication", "Synchronous", "Asynchronous"],
                ["Failover", "Automatic (DNS switch)", "Manual promotion"],
                ["Read traffic", "No (standby only)", "Yes (offload reads)"],
                ["Cross-Region", "No (same region)", "Yes (can be cross-region)"],
                ["Max count", "1 standby", "Up to 15 replicas"],
              ]}
            />
          </InfoCard>

          <InfoCard title="RDS Backups">
            <BulletList
              items={[
                "Automated backups: Daily full backup + transaction logs every 5 min",
                "Retention: 1-35 days (default 7 days)",
                "Point-in-time recovery: Restore to any second within retention period",
                "Manual snapshots: User-triggered, persist until you delete them",
                "Snapshots can be shared across accounts or copied to other regions",
              ]}
            />
          </InfoCard>

          <InfoCard variant="important" title="RDS Storage Auto Scaling">
            <BulletList
              items={[
                "Automatically increases storage when running low",
                "You set a Maximum Storage Threshold",
                "Useful for unpredictable workloads",
                "Supports all RDS database engines",
              ]}
            />
          </InfoCard>
        </TopicSection>

        <TopicSection title="Amazon Aurora" id="aurora">
          <InfoCard title="What is Aurora?">
            <p className="mb-3">
              <strong>AWS proprietary relational database</strong> — Compatible with MySQL and PostgreSQL
              but built for the cloud with superior performance and availability.
            </p>
            <BulletList
              items={[
                "5x performance over MySQL, 3x over PostgreSQL on RDS",
                "Storage auto-scales from 10GB to 128TB",
                "Up to 15 Read Replicas (faster replication than RDS)",
                "6 copies of data across 3 AZs (highly durable)",
                "Automatic failover in less than 30 seconds",
                "Costs ~20% more than RDS but much more efficient",
              ]}
            />
          </InfoCard>

          <InfoCard title="Aurora Serverless">
            <BulletList
              items={[
                "Auto-scales compute capacity based on demand",
                "Pay per second — great for infrequent or unpredictable workloads",
                "No capacity planning needed",
                "Use case: Dev/test environments, variable traffic apps",
              ]}
            />
          </InfoCard>

          <InfoCard variant="tip" title="Exam Tip">
            <p>&quot;Aurora = AWS proprietary, cloud-optimized, MySQL/PostgreSQL compatible, more performant, more expensive&quot; — If the question mentions cost optimization and doesn&apos;t need Aurora features, choose RDS instead.</p>
          </InfoCard>
        </TopicSection>

        <TopicSection title="Amazon DynamoDB" id="dynamodb">
          <InfoCard title="What is DynamoDB?">
            <p className="mb-3">
              <strong>Fully managed NoSQL key-value database</strong> — Serverless, scales to massive workloads
              with single-digit millisecond performance.
            </p>
            <BulletList
              items={[
                "Serverless: No servers to manage, auto-scales",
                "Single-digit millisecond latency at any scale",
                "Capacity modes: On-Demand (pay per request) or Provisioned",
                "Built-in security, backup, and restore",
                "Global Tables: Multi-region, multi-active replication",
                "Event-driven: Integrates with Lambda via DynamoDB Streams",
                "Max item size: 400KB",
              ]}
            />
          </InfoCard>

          <InfoCard title="DynamoDB Key Concepts">
            <BulletList
              items={[
                "Table: Collection of items (like rows)",
                "Item: A single record (like a row)",
                "Attributes: Data fields (like columns, but flexible)",
                "Primary Key: Partition Key (required) + optional Sort Key",
                "No joins or complex queries like SQL — design differently",
              ]}
            />
          </InfoCard>

          <InfoCard title="DynamoDB Accelerator (DAX)">
            <BulletList
              items={[
                "In-memory cache specifically for DynamoDB",
                "Microsecond latency (10x improvement)",
                "No application code changes needed",
                "Use case: Read-heavy, latency-sensitive applications",
              ]}
            />
          </InfoCard>

          <InfoCard variant="important" title="DynamoDB vs RDS">
            <ComparisonTable
              headers={["Feature", "DynamoDB", "RDS"]}
              rows={[
                ["Type", "NoSQL (Key-Value)", "Relational (SQL)"],
                ["Schema", "Flexible (schemaless)", "Fixed schema"],
                ["Scaling", "Automatic, serverless", "Vertical (instance size)"],
                ["Joins", "Not supported", "Full SQL joins"],
                ["Best for", "High-scale, simple queries", "Complex queries, relationships"],
                ["Latency", "Single-digit ms", "Depends on query"],
              ]}
            />
          </InfoCard>
        </TopicSection>

        <TopicSection title="ElastiCache" id="elasticache">
          <InfoCard title="What is ElastiCache?">
            <p className="mb-3">
              <strong>Managed in-memory caching service</strong> — Reduces database load by caching
              frequently accessed data in memory.
            </p>
            <BulletList
              items={[
                "Supports Redis and Memcached",
                "Microsecond read latency",
                "Reduces load on primary databases",
                "Use cases: Session storage, leaderboards, real-time analytics",
                "Managed: Patching, backups, failover handled by AWS",
              ]}
            />
          </InfoCard>

          <InfoCard title="Redis vs Memcached">
            <ComparisonTable
              headers={["Feature", "Redis", "Memcached"]}
              rows={[
                ["Data structures", "Rich (strings, lists, sets, hashes)", "Simple key-value"],
                ["Persistence", "Yes (backup/restore)", "No"],
                ["Replication", "Multi-AZ with failover", "No replication"],
                ["Use case", "Complex caching, pub/sub", "Simple caching, multi-threaded"],
              ]}
            />
          </InfoCard>

          <InfoCard variant="tip" title="Exam Tip">
            <p>&quot;ElastiCache = In-memory, microsecond latency, reduce DB load&quot; — If the question mentions caching, session storage, or reducing read load on a database, think ElastiCache.</p>
          </InfoCard>
        </TopicSection>

        <TopicSection title="Amazon Redshift" id="redshift">
          <InfoCard title="What is Redshift?">
            <p className="mb-3">
              <strong>Fully managed data warehouse</strong> — Designed for Online Analytical Processing (OLAP),
              not for transaction processing (OLTP).
            </p>
            <BulletList
              items={[
                "Columnar storage (optimized for analytics queries)",
                "Massively Parallel Processing (MPP) architecture",
                "10x better performance than traditional data warehouses",
                "Scales to petabytes of data",
                "SQL-based interface (familiar to analysts)",
                "Integrates with BI tools (QuickSight, Tableau)",
                "Redshift Serverless: No cluster management needed",
              ]}
            />
          </InfoCard>

          <InfoCard variant="important" title="OLTP vs OLAP">
            <ComparisonTable
              headers={["", "OLTP", "OLAP"]}
              rows={[
                ["Purpose", "Transaction processing", "Analytics & reporting"],
                ["Queries", "Simple, frequent", "Complex, aggregations"],
                ["Example", "Place an order, update profile", "Total sales last quarter"],
                ["AWS Service", "RDS / Aurora / DynamoDB", "Redshift"],
              ]}
            />
          </InfoCard>
        </TopicSection>

        <TopicSection title="Other Database Services" id="other-databases">
          <ComparisonTable
            headers={["Service", "Type", "Use Case", "Exam Keyword"]}
            rows={[
              ["DocumentDB", "Document DB (MongoDB compatible)", "Content management, catalogs", "MongoDB workloads on AWS"],
              ["Neptune", "Graph Database", "Social networks, fraud detection", "Highly connected datasets"],
              ["Timestream", "Time Series DB", "IoT data, metrics, DevOps", "Time-stamped data"],
              ["QLDB", "Ledger Database", "Financial transactions, supply chain", "Immutable, cryptographically verifiable"],
              ["Managed Blockchain", "Blockchain", "Decentralized apps", "Multiple parties, no trusted authority"],
              ["Keyspaces", "Wide Column (Cassandra compatible)", "High-scale apps", "Apache Cassandra workloads"],
              ["MemoryDB for Redis", "Durable in-memory DB", "Ultra-fast with durability", "Redis-compatible, durable"],
            ]}
          />
        </TopicSection>

        <TopicSection title="Choosing the Right Database" id="choosing">
          <InfoCard title="Decision Guide">
            <ComparisonTable
              headers={["If you need...", "Choose..."]}
              rows={[
                ["Relational + managed", "RDS"],
                ["Relational + high performance + AWS optimized", "Aurora"],
                ["NoSQL key-value at scale", "DynamoDB"],
                ["Caching / in-memory", "ElastiCache"],
                ["Data warehouse / analytics", "Redshift"],
                ["MongoDB compatibility", "DocumentDB"],
                ["Graph relationships", "Neptune"],
                ["Immutable ledger", "QLDB"],
                ["Time series data", "Timestream"],
              ]}
            />
          </InfoCard>
        </TopicSection>

        <TopicSection title="Exam Scenarios" id="exam-scenarios">
          <ComparisonTable
            headers={["Scenario", "Answer"]}
            rows={[
              ["Need a managed relational database", "Amazon RDS"],
              ["Need high availability for RDS", "Enable Multi-AZ"],
              ["Need to scale reads for RDS", "Create Read Replicas"],
              ["Need MySQL/PostgreSQL with 5x performance", "Amazon Aurora"],
              ["Serverless NoSQL with millisecond latency", "DynamoDB"],
              ["Cache frequently accessed data to reduce DB load", "ElastiCache"],
              ["Run complex analytics on petabytes of data", "Amazon Redshift"],
              ["Store social network relationships", "Amazon Neptune"],
              ["Need immutable, verifiable transaction history", "Amazon QLDB"],
              ["Migrate MongoDB workloads to AWS", "Amazon DocumentDB"],
              ["IoT sensor data with timestamps", "Amazon Timestream"],
              ["Unpredictable database workload, pay per use", "DynamoDB On-Demand or Aurora Serverless"],
              ["Need microsecond reads for DynamoDB", "DynamoDB Accelerator (DAX)"],
            ]}
          />
        </TopicSection>
      </div>
    </TopicLayout>
  );
}
