import { TopicHeader } from "@/components/TopicHeader";
import {
  TopicSection,
  InfoCard,
  BulletList,
  ComparisonTable,
} from "@/components/TopicSection";
import { TopicLayout } from "@/components/TopicLayout";

const sections = [
  { id: "what-is-iam", title: "What is IAM?" },
  { id: "core-components", title: "Core Components" },
  { id: "policies", title: "IAM Policies" },
  { id: "policy-evaluation", title: "Policy Evaluation Logic" },
  { id: "roles", title: "IAM Roles Deep Dive" },
  { id: "security", title: "Security Best Practices" },
  { id: "credentials", title: "Credential Types" },
  { id: "related-services", title: "Related Security Services" },
  { id: "exam-scenarios", title: "Exam Scenarios" },
];

export default function IAMPage() {
  return (
    <TopicLayout topic="IAM">
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <TopicHeader
        icon="🔐"
        title="IAM"
        subtitle="Identity & Access Management - The security guard of your AWS account"
        sections={sections}
      />

      <TopicSection title="What is IAM?" id="what-is-iam">
        <InfoCard>
          <p className="mb-3">
            IAM is a <strong>global AWS service</strong> (not region-specific) that controls
            WHO can access WHAT in your AWS account.
          </p>
          <BulletList
            items={[
              "Authentication: \"Who are you?\" (identity verification)",
              "Authorization: \"What are you allowed to do?\" (permissions)",
              "Free to use (no additional charge)",
              "Global service (not tied to any region)",
              "Integrated with almost every AWS service",
            ]}
          />
        </InfoCard>
        <InfoCard variant="tip" title="Memory Aid">
          <p>&quot;IAM is FREE and GLOBAL&quot; — No cost, works across all regions.</p>
        </InfoCard>
      </TopicSection>

      <TopicSection title="Core Components" id="core-components">
        <InfoCard title="Root User">
          <BulletList
            items={[
              "Created when you first set up your AWS account",
              "Has COMPLETE access to all AWS services and resources",
              "Best practice: NEVER use root for daily tasks",
              "Secure it with MFA immediately",
              "Use only for account-level tasks (billing, account closure, etc.)",
            ]}
          />
        </InfoCard>

        <InfoCard title="IAM Users">
          <BulletList
            items={[
              "Represents a person or application that interacts with AWS",
              "Has permanent long-term credentials (username/password or access keys)",
              "Can belong to multiple groups",
              "Best practice: One user per physical person, never share credentials",
            ]}
          />
        </InfoCard>

        <InfoCard title="IAM Groups">
          <BulletList
            items={[
              "A collection of IAM users for easier permission management",
              "A user can belong to multiple groups (max 10)",
              "Groups CANNOT be nested (no group within a group)",
              "Groups cannot be used as a \"Principal\" in a policy",
            ]}
          />
        </InfoCard>

        <InfoCard title="IAM Roles">
          <BulletList
            items={[
              "An identity with permissions that can be ASSUMED temporarily",
              "No permanent credentials — uses temporary security tokens",
              "Used by: AWS services, applications, federated users",
              "Example: An EC2 instance assuming a role to access S3",
            ]}
          />
        </InfoCard>

        <InfoCard title="IAM Policies">
          <BulletList
            items={[
              "JSON documents that define permissions",
              "Attached to users, groups, or roles",
              "Define what actions are allowed or denied on which resources",
            ]}
          />
        </InfoCard>

        <InfoCard variant="tip" title="Memory Aid">
          <p>&quot;Roles for machines, Users for humans&quot; — EC2/Lambda = Role, People = User</p>
        </InfoCard>
      </TopicSection>

      <TopicSection title="IAM Policies" id="policies">
        <InfoCard title="Policy Structure (JSON)">
          <div className="bg-[var(--color-background)] rounded p-3 font-mono text-xs overflow-x-auto mt-2">
            <pre>{`{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "AllowS3Read",
    "Effect": "Allow",
    "Action": ["s3:GetObject", "s3:ListBucket"],
    "Resource": ["arn:aws:s3:::my-bucket/*"],
    "Condition": { ... }
  }]
}`}</pre>
          </div>
        </InfoCard>

        <InfoCard title="Policy Elements">
          <BulletList
            items={[
              "Version: Always \"2012-10-17\" (latest policy language version)",
              "Effect: \"Allow\" or \"Deny\"",
              "Action: What API calls are allowed/denied (e.g., \"s3:GetObject\")",
              "Resource: Which AWS resources (ARN format)",
              "Condition: Optional conditions (IP, time, MFA, etc.)",
              "Principal: Who the policy applies to (resource-based policies only)",
            ]}
          />
        </InfoCard>

        <InfoCard title="Types of Policies">
          <BulletList
            items={[
              "AWS Managed Policies — Created by AWS (e.g., AdministratorAccess, ReadOnlyAccess)",
              "Customer Managed Policies — Created by you, reusable, version controlled",
              "Inline Policies — Embedded directly in a single user/group/role, not reusable",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="Policy Evaluation Logic" id="policy-evaluation">
        <InfoCard variant="important" title="The Golden Rule">
          <BulletList
            items={[
              "By default, all requests are DENIED (implicit deny)",
              "An explicit ALLOW overrides the implicit deny",
              "An explicit DENY ALWAYS overrides any ALLOW",
              "Priority: Explicit Deny > Explicit Allow > Implicit Deny",
            ]}
          />
        </InfoCard>
        <InfoCard variant="tip" title="Exam Tip">
          <p>&quot;Deny ALWAYS wins&quot; — Explicit deny beats any allow. This is the most important IAM rule.</p>
        </InfoCard>
      </TopicSection>

      <TopicSection title="IAM Roles Deep Dive" id="roles">
        <InfoCard title="When to Use Roles">
          <BulletList
            items={[
              "EC2 instances needing access to other AWS services",
              "Lambda functions accessing DynamoDB, S3, etc.",
              "Cross-account access (Account A accessing Account B)",
              "Federated users (SAML, OpenID Connect)",
              "AWS services acting on your behalf",
            ]}
          />
        </InfoCard>

        <InfoCard title="Trust Policy vs Permission Policy">
          <BulletList
            items={[
              "Trust Policy: WHO can assume the role (e.g., ec2.amazonaws.com)",
              "Permission Policy: WHAT the role can do (e.g., s3:GetObject)",
              "Instance Profile: Container for IAM role attached to EC2",
            ]}
          />
        </InfoCard>

        <InfoCard variant="tip" title="Exam Tip">
          <p>If asked &quot;how to give EC2 permissions to access other AWS services&quot; → Answer is ALWAYS &quot;use IAM Roles&quot; (never access keys on the instance).</p>
        </InfoCard>
      </TopicSection>

      <TopicSection title="Security Best Practices" id="security">
        <InfoCard title="✅ DO">
          <BulletList
            items={[
              "Enable MFA on root account immediately",
              "Create individual IAM users (never share)",
              "Use groups to assign permissions",
              "Use roles for AWS services and applications",
              "Follow least privilege principle",
              "Enable CloudTrail for auditing",
              "Set a strong password policy",
              "Rotate access keys regularly",
            ]}
          />
        </InfoCard>

        <InfoCard variant="warning" title="❌ DON'T">
          <BulletList
            items={[
              "Don't use root account for daily tasks",
              "Don't share credentials between users",
              "Don't embed access keys in code",
              "Don't give full admin access to everyone",
              "Don't use access keys when roles are possible",
              "Don't forget to remove unused users/keys",
            ]}
          />
        </InfoCard>

        <InfoCard title="MFA (Multi-Factor Authentication)">
          <BulletList
            items={[
              "Something you KNOW (password) + Something you HAVE (device/token)",
              "Virtual MFA: Phone app like Google Authenticator",
              "Hardware TOTP token: Physical key fob",
              "FIDO2 security key: YubiKey",
              "Enable for: Root account + all privileged users",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="Credential Types" id="credentials">
        <ComparisonTable
          headers={["Credential Type", "Used For"]}
          rows={[
            ["Username + Password", "AWS Management Console (web browser)"],
            ["Access Keys (ID + Secret)", "AWS CLI and SDK (programmatic access)"],
            ["Temporary Credentials (STS)", "Generated when assuming a role, auto-expire"],
            ["SSH Keys", "AWS CodeCommit (Git repositories)"],
            ["MFA Token", "Additional authentication factor"],
          ]}
        />
        <InfoCard variant="tip" title="Exam Tips">
          <BulletList
            items={[
              "\"Programmatic access\" = Access Keys",
              "\"Console access\" = Username + Password",
              "\"Temporary credentials\" = Roles + STS",
              "Max 2 access keys per user",
            ]}
          />
        </InfoCard>
      </TopicSection>

      <TopicSection title="Related Security Services" id="related-services">
        <ComparisonTable
          headers={["Service", "Purpose", "Exam Keyword"]}
          rows={[
            ["AWS Organizations", "Manage multiple accounts, SCPs", "Centralized management"],
            ["IAM Identity Center", "Single Sign-On for multiple accounts", "SSO, centralized access"],
            ["Amazon Cognito", "Identity for APP users (not AWS users)", "Mobile/web app users"],
            ["CloudTrail", "Records ALL API calls", "Audit, who did what"],
            ["GuardDuty", "Threat detection with ML", "Malicious activity"],
            ["Trusted Advisor", "Best practice recommendations", "Security checks"],
            ["Security Hub", "Central security dashboard", "Aggregated findings"],
          ]}
        />
        <InfoCard variant="important" title="Key Distinction">
          <p><strong>Cognito = App Users, IAM = AWS Users</strong> — Never create IAM users for your application&apos;s end users.</p>
        </InfoCard>
      </TopicSection>

      <TopicSection title="Exam Scenarios" id="exam-scenarios">
        <ComparisonTable
          headers={["Scenario", "Answer"]}
          rows={[
            ["Employees access Console with corporate credentials", "IAM Identity Center (SSO)"],
            ["EC2 instance needs to access S3", "Attach an IAM Role (never access keys)"],
            ["Developer accidentally deleted production resources", "Least privilege + MFA for destructive actions"],
            ["Temporary access for a contractor", "IAM Role with time-limited permissions"],
            ["Another AWS account needs your S3 access", "Cross-account Role OR Bucket Policy"],
            ["Mobile app users need sign-in", "Amazon Cognito (NOT IAM)"],
            ["Who is responsible for enabling MFA?", "Customer (you), NOT AWS"],
            ["Audit who made changes", "AWS CloudTrail"],
            ["50 developers need same permissions", "IAM Group with attached policy"],
            ["Most secure way for apps to get credentials", "IAM Roles (temporary, auto-rotated)"],
          ]}
        />
      </TopicSection>
    </div>
    </TopicLayout>
  );
}
