import { TopicHeader } from "@/components/TopicHeader";
import {
  TopicSection,
  InfoCard,
  BulletList,
  ComparisonTable,
} from "@/components/TopicSection";
import { TopicLayout } from "@/components/TopicLayout";

const sections = [
  { id: "what-is-s3", title: "What is S3?" },
  { id: "buckets-objects", title: "Buckets & Objects" },
  { id: "storage-classes", title: "Storage Classes" },
  { id: "security", title: "S3 Security" },
  { id: "versioning", title: "Versioning" },
  { id: "replication", title: "Replication" },
  { id: "exam-tips", title: "Exam Tips" },
];

export default function S3Page() {
  return (
    <TopicLayout topic="S3">
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <TopicHeader
        icon="🪣"
        title="S3"
        subtitle="Simple Storage Service - Infinitely scalable object storage"
        sections={sections}
      />

      <TopicSection title="What is S3?" id="what-is-s3">
        <InfoCard>
          <p className="mb-3">
            Amazon S3 (Simple Storage Service) is an <strong>object storage service</strong> that
            offers industry-leading scalability, data availability, security, and performance.
          </p>
          <BulletList
            items={[
              "Infinitely scaling storage",
              "Store and retrieve any amount of data from anywhere",
              "Used for: backup, storage, disaster recovery, archive, application hosting, media hosting, data lakes, static websites",
              "Many AWS services use S3 as an integration/output",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="Buckets & Objects" id="buckets-objects">
        <InfoCard title="Buckets">
          <BulletList
            items={[
              "S3 stores objects (files) in \"buckets\" (directories)",
              "Buckets must have a globally unique name (across all accounts)",
              "Buckets are defined at the region level",
              "Naming: no uppercase, no underscore, 3-63 characters, not an IP",
            ]}
          />
        </InfoCard>

        <InfoCard title="Objects">
          <BulletList
            items={[
              "Objects (files) have a Key — the full path (e.g., s3://my-bucket/folder/file.txt)",
              "Max object size: 5 TB (5000 GB)",
              "If uploading more than 5 GB, must use \"multi-part upload\"",
              "Objects have: metadata, tags, version ID (if versioning enabled)",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="Storage Classes" id="storage-classes">
        <ComparisonTable
          headers={["Class", "Availability", "Use Case", "Retrieval"]}
          rows={[
            ["S3 Standard", "99.99%", "Frequently accessed data", "Immediate"],
            ["S3 Standard-IA", "99.9%", "Infrequent access, rapid retrieval", "Immediate"],
            ["S3 One Zone-IA", "99.5%", "Infrequent, single AZ (re-creatable)", "Immediate"],
            ["S3 Glacier Instant", "99.9%", "Archive with instant access", "Milliseconds"],
            ["S3 Glacier Flexible", "99.9%", "Archive, flexible retrieval", "Minutes to hours"],
            ["S3 Glacier Deep Archive", "99.9%", "Long-term archive", "12-48 hours"],
            ["S3 Intelligent-Tiering", "99.9%", "Unknown/changing access patterns", "Automatic"],
          ]}
        />

        <InfoCard variant="tip" title="Exam Tips">
          <BulletList
            items={[
              "Standard: Most expensive, most available, no retrieval fee",
              "Standard-IA: Cheaper storage, but retrieval fee applies",
              "One Zone-IA: Like IA but single AZ (data lost if AZ destroyed)",
              "Glacier: For archiving. Instant → Flexible → Deep Archive (cheapest)",
              "Intelligent-Tiering: Auto-moves objects between tiers based on access",
              "Lifecycle Rules: Automate transitions between storage classes",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="S3 Security" id="security">
        <InfoCard title="Bucket Policies">
          <BulletList
            items={[
              "JSON-based policies attached to buckets",
              "Can grant access to other accounts (cross-account)",
              "Can make bucket public or restrict access",
              "Use for: granting public access, forcing encryption, cross-account access",
            ]}
          />
        </InfoCard>

        <InfoCard title="Access Control">
          <BulletList
            items={[
              "IAM Policies: Attached to users/roles/groups",
              "Bucket Policies: Attached to the bucket (resource-based)",
              "ACLs (Access Control Lists): Legacy, less common now",
              "Block Public Access: Account-level setting to prevent public buckets",
              "An IAM principal can access S3 if: IAM policy ALLOWS it OR bucket policy ALLOWS it, AND there's no explicit DENY",
            ]}
          />
        </InfoCard>

        <InfoCard title="Encryption">
          <BulletList
            items={[
              "SSE-S3: Encryption with AWS-managed keys (default)",
              "SSE-KMS: Encryption with KMS keys (you manage)",
              "SSE-C: Encryption with customer-provided keys",
              "Client-Side Encryption: You encrypt before uploading",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="Versioning" id="versioning">
        <InfoCard>
          <BulletList
            items={[
              "Enabled at the bucket level",
              "Same key overwrite will increment the version (1, 2, 3...)",
              "Protects against unintended deletes (can restore previous version)",
              "Easy rollback to previous versions",
              "Any file not versioned prior to enabling will have version \"null\"",
              "Suspending versioning does not delete previous versions",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="Replication" id="replication">
        <InfoCard>
          <BulletList
            items={[
              "CRR (Cross-Region Replication): Replicate to different region",
              "SRR (Same-Region Replication): Replicate within same region",
              "Must enable versioning in source and destination buckets",
              "Buckets can be in different AWS accounts",
              "Copying is asynchronous",
              "Use cases: CRR for compliance, lower latency; SRR for log aggregation, live replication",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="Exam Tips" id="exam-tips">
        <ComparisonTable
          headers={["Scenario", "Answer"]}
          rows={[
            ["Store unlimited data with high durability", "S3 Standard"],
            ["Infrequent access but need fast retrieval", "S3 Standard-IA"],
            ["Archive data, retrieve in minutes", "S3 Glacier Flexible"],
            ["Archive data, rarely accessed (7-10 years)", "S3 Glacier Deep Archive"],
            ["Unknown access patterns", "S3 Intelligent-Tiering"],
            ["Host a static website", "S3 + Static Website Hosting"],
            ["Protect against accidental deletes", "Enable Versioning"],
            ["Replicate data to another region for DR", "Cross-Region Replication (CRR)"],
            ["Make bucket accessible to another account", "Bucket Policy with Principal"],
            ["Prevent any public access", "S3 Block Public Access"],
          ]}
        />

        <InfoCard variant="important" title="Key Facts">
          <BulletList
            items={[
              "S3 has 99.999999999% (11 9's) durability",
              "Max object size: 5 TB",
              "Multi-part upload recommended for > 100 MB",
              "Bucket names are globally unique",
              "S3 is a global service but buckets are regional",
              "No limit on number of objects in a bucket",
            ]}
          />
        </InfoCard>
      </TopicSection>
    </div>
    </TopicLayout>
  );
}
