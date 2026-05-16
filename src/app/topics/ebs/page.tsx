import { TopicHeader } from "@/components/TopicHeader";
import {
  TopicSection,
  InfoCard,
  BulletList,
  ComparisonTable,
} from "@/components/TopicSection";
import { TopicLayout } from "@/components/TopicLayout";

const sections = [
  { id: "storage-overview", title: "Storage Overview" },
  { id: "ebs", title: "EBS (Elastic Block Store)" },
  { id: "snapshots", title: "EBS Snapshots" },
  { id: "volume-types", title: "EBS Volume Types" },
  { id: "multi-attach", title: "EBS Multi-Attach" },
  { id: "encryption", title: "EBS Encryption" },
  { id: "instance-store", title: "EC2 Instance Store" },
  { id: "efs", title: "EFS (Elastic File System)" },
  { id: "fsx", title: "FSx (Managed File Systems)" },
  { id: "comparison", title: "Storage Comparison" },
  { id: "image-builder", title: "EC2 Image Builder" },
  { id: "exam-tips", title: "Exam Tips" },
];

export default function EBSPage() {
  return (
    <TopicLayout topic="EBS & Storage">
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <TopicHeader
        icon="💾"
        title="EBS & Storage"
        subtitle="EC2 Instance Storage - All storage options from EBS to EFS to FSx"
        sections={sections}
      />

      <TopicSection title="Storage Overview" id="storage-overview">
        <InfoCard>
          <p className="mb-3">EC2 instances need storage for OS, apps, and data. AWS offers multiple options:</p>
          <BulletList
            items={[
              "EBS (Elastic Block Store) — Network-attached persistent storage",
              "EC2 Instance Store — Physical disk attached to host (ephemeral)",
              "EFS (Elastic File System) — Managed network file system",
              "FSx — Managed third-party file systems",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="EBS (Elastic Block Store)" id="ebs">
        <InfoCard title="What is EBS?">
          <BulletList
            items={[
              "A network drive (not physical) you attach to an EC2 instance",
              "Think of it like a \"network USB stick\"",
              "Data PERSISTS even after instance is terminated (if configured)",
              "Bound to a specific Availability Zone (AZ)",
              "Can be detached and attached to another instance (same AZ)",
              "You must provision capacity in advance (size in GB + IOPS)",
              "Billed for provisioned capacity (even if unused)",
            ]}
          />
        </InfoCard>

        <InfoCard variant="important" title="Delete on Termination">
          <BulletList
            items={[
              "ROOT EBS volume: deleted by default when instance terminates",
              "Other attached EBS volumes: NOT deleted by default",
              "You can control this via Console or CLI",
              "Exam: \"How to preserve root volume?\" → Disable Delete on Termination",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="EBS Snapshots" id="snapshots">
        <InfoCard title="What are Snapshots?">
          <BulletList
            items={[
              "A backup (point-in-time copy) of your EBS volume",
              "Not necessary to detach volume first, but recommended",
              "Can copy snapshots across AZs or Regions",
              "This is how you MOVE volumes between AZs/Regions!",
            ]}
          />
        </InfoCard>

        <InfoCard title="Snapshot Features">
          <BulletList
            items={[
              "Snapshot Archive: Move to archive tier (75% cheaper), 24-72 hrs to restore",
              "Recycle Bin: Retain deleted snapshots (1 day to 1 year), protects against accidental deletion",
              "Fast Snapshot Restore (FSR): No latency on first use, expensive but useful for critical workloads",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="EBS Volume Types" id="volume-types">
        <ComparisonTable
          headers={["Type", "Max IOPS", "Boot?", "Use Case"]}
          rows={[
            ["gp3 (General Purpose SSD)", "16,000", "Yes", "General workloads, dev/test"],
            ["gp2 (General Purpose SSD)", "3,000 (burst)", "Yes", "General (burst, linked to size)"],
            ["io2 (Provisioned IOPS SSD)", "256,000", "Yes", "High-perf databases"],
            ["st1 (Throughput HDD)", "500", "No", "Big data, throughput"],
            ["sc1 (Cold HDD)", "250", "No", "Archive, cold data"],
          ]}
        />

        <InfoCard title="SSD Details">
          <BulletList
            items={[
              "gp3: Baseline 3,000 IOPS + 125 MiB/s. Can increase independently up to 16,000 IOPS",
              "gp2: IOPS linked to volume size (3 IOPS per GB). Burst up to 3,000",
              "io1/io2: For critical databases. Supports EBS Multi-Attach",
              "EXAM: gp3 lets you set IOPS and throughput independently; gp2 links them to size",
            ]}
          />
        </InfoCard>

        <InfoCard title="HDD Details">
          <BulletList
            items={[
              "st1: Low-cost, frequently accessed, throughput-intensive (Big Data, logs)",
              "sc1: Lowest cost, infrequently accessed (archive)",
              "CANNOT be boot volumes!",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="EBS Multi-Attach" id="multi-attach">
        <InfoCard>
          <BulletList
            items={[
              "Attach SAME EBS volume to multiple EC2 instances in SAME AZ",
              "Only available for io1/io2 family",
              "Up to 16 instances can be attached at once",
              "Must use a cluster-aware file system (not XFS, EXT4)",
              "Use case: Higher availability in clustered apps (e.g., Teradata)",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="EBS Encryption" id="encryption">
        <InfoCard title="What you get with encrypted EBS">
          <BulletList
            items={[
              "Data at rest encrypted",
              "Data in-flight (between instance and volume) encrypted",
              "All snapshots encrypted",
              "All volumes from encrypted snapshots are encrypted",
              "Uses AWS KMS keys (AES-256)",
              "Minimal impact on latency",
            ]}
          />
        </InfoCard>

        <InfoCard variant="important" title="How to encrypt an unencrypted volume">
          <BulletList
            items={[
              "1. Create a snapshot of the unencrypted volume",
              "2. Copy the snapshot and enable encryption",
              "3. Create a new volume from the encrypted snapshot",
              "4. Attach the encrypted volume to the instance",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="EC2 Instance Store" id="instance-store">
        <InfoCard>
          <BulletList
            items={[
              "Physical hard drive attached to the host machine",
              "NOT network-attached (unlike EBS)",
              "Provides the HIGHEST I/O performance possible",
              "EPHEMERAL: Data LOST when instance stops or terminates",
              "Data survives a reboot, but NOT stop/terminate/hardware failure",
              "Great for: buffer, cache, scratch data, temporary content",
              "Your responsibility to backup and replicate",
            ]}
          />
        </InfoCard>
        <InfoCard variant="tip" title="Exam Tip">
          <p>&quot;Temporary storage&quot;, &quot;highest performance&quot;, &quot;ephemeral&quot;, or &quot;cache&quot; → Instance Store</p>
        </InfoCard>
      </TopicSection>

      <TopicSection title="EFS (Elastic File System)" id="efs">
        <InfoCard title="What is EFS?">
          <BulletList
            items={[
              "Managed NFS that can be mounted on MANY EC2 instances",
              "Works across MULTIPLE Availability Zones",
              "Highly available, scalable, expensive (3x gp2 price)",
              "Works only with Linux-based AMIs (POSIX file system)",
              "Automatically scales (no capacity planning needed)",
              "Pay only for what you use (no pre-provisioning)",
            ]}
          />
        </InfoCard>

        <InfoCard title="EFS Storage Classes">
          <BulletList
            items={[
              "EFS Standard: For frequently accessed files",
              "EFS Infrequent Access (EFS-IA): Up to 92% lower cost",
              "Lifecycle Policy: Auto-move files not accessed for X days to IA",
              "Standard: Multi-AZ redundancy (production)",
              "One Zone: Single AZ (dev, backup) — cheaper",
            ]}
          />
        </InfoCard>

        <InfoCard variant="important" title="EFS vs EBS">
          <BulletList
            items={[
              "EBS: One instance (except Multi-Attach io1/io2), one AZ",
              "EFS: Many instances, multi-AZ, Linux only, more expensive, pay-per-use",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="FSx (Managed File Systems)" id="fsx">
        <ComparisonTable
          headers={["FSx Type", "Protocol", "Use Case", "Exam Keyword"]}
          rows={[
            ["FSx for Windows", "SMB + NTFS", "Windows shared files + Active Directory", "Windows + SMB + AD"],
            ["FSx for Lustre", "POSIX", "HPC, ML, video processing", "HPC + Linux + high perf"],
            ["FSx for NetApp ONTAP", "NFS, SMB, iSCSI", "Multi-protocol, multi-OS", "Cross-platform"],
            ["FSx for OpenZFS", "NFS", "ZFS workloads", "ZFS migration"],
          ]}
        />
      </TopicSection>

      <TopicSection title="Storage Comparison" id="comparison">
        <ComparisonTable
          headers={["Feature", "EBS", "Instance Store", "EFS", "FSx"]}
          rows={[
            ["Type", "Block storage", "Block storage", "File storage", "File storage"],
            ["Network?", "Yes", "No (physical)", "Yes", "Yes"],
            ["Persistent?", "Yes", "NO (ephemeral)", "Yes", "Yes"],
            ["Multi-AZ?", "No (single AZ)", "No", "Yes", "Depends"],
            ["Multi-instance?", "No* (io1/io2 only)", "No", "Yes", "Yes"],
            ["OS Support", "All", "All", "Linux only", "Depends"],
            ["Performance", "Good", "BEST (local)", "Good", "Very High"],
            ["Cost", "Moderate", "Included w/ EC2", "Expensive", "Varies"],
          ]}
        />
      </TopicSection>

      <TopicSection title="EC2 Image Builder" id="image-builder">
        <InfoCard>
          <BulletList
            items={[
              "Automates creation, testing, and distribution of AMIs",
              "FREE service (pay only for EC2 instances created during process)",
              "Pipeline: Build → Test → Distribute",
              "Can run on a schedule (weekly, on package updates)",
              "Multi-region distribution, multi-account sharing",
              "Built-in automated testing before distribution",
            ]}
          />
        </InfoCard>
        <InfoCard variant="tip" title="Exam Tips">
          <BulletList
            items={[
              "\"Automate AMI creation\" → Image Builder",
              "\"Ensure AMIs are patched weekly\" → Image Builder with schedule",
              "\"Test AMI before deploying\" → Image Builder (built-in test phase)",
              "It's FREE (only pay for underlying EC2/EBS resources)",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="Exam Tips" id="exam-tips">
        <ComparisonTable
          headers={["Question", "Answer"]}
          rows={[
            ["Move EBS volume to another AZ?", "Snapshot → Copy to new AZ → Create volume"],
            ["Move EBS volume to another Region?", "Snapshot → Copy to new Region → Create volume"],
            ["Instance terminated, data lost?", "EBS with Delete on Termination disabled"],
            ["Highest possible IOPS for temp data?", "EC2 Instance Store"],
            ["Shared storage across Linux instances in different AZs?", "EFS"],
            ["Windows shared file system with Active Directory?", "FSx for Windows"],
            ["High-performance computing file system?", "FSx for Lustre"],
            ["Reduce EFS costs?", "EFS-IA with Lifecycle Policies"],
            ["Which EBS types can be boot volumes?", "Only SSD (gp2, gp3, io1, io2)"],
            ["Cost-effective large sequential reads?", "st1 (Throughput Optimized HDD)"],
          ]}
        />
      </TopicSection>
    </div>
    </TopicLayout>
  );
}
