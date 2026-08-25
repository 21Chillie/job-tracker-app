import { OTPEmailType } from "@/types/auth.type";
import { subjectMap } from "@/utils/auth-helper";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";

export type OTPEmailProps = {
  otp?: string;
  appName?: string;
  type: OTPEmailType;
};

export default function OTPEmailTemplate({
  type = "email-verification",
  otp = "123456",
  appName = "Job Tracker App",
}: OTPEmailProps) {
  return (
    <Tailwind>
      <Html lang="en">
        <Head />
        <Preview>
          {subjectMap[type]} for {appName}
        </Preview>

        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto max-w-md px-4 py-8">
            {/* Header */}
            <Section className="text-center mb-8">
              <Heading className="text-2xl font-bold text-gray-900">
                {appName}
              </Heading>
            </Section>

            {/* Main Card */}
            <Section className="bg-white rounded-lg border border-gray-200 p-8">
              <Heading className="text-xl font-semibold text-gray-900 mb-4">
                {subjectMap[type]}
              </Heading>

              <Text className="text-gray-600 mb-6">
                Use the following code to{" "}
                <span className="lowercase">{subjectMap[type]}</span>. This code
                will expire in 10 minutes.
              </Text>

              {/* OTP Code */}
              <Section className="bg-gray-50 border border-gray-200 rounded-lg py-6 px-4 text-center mb-6">
                <Text className="text-4xl font-bold tracking-[8px] text-gray-900 m-0">
                  {otp}
                </Text>
              </Section>

              <Text className="text-sm text-gray-500">
                If you didn&apos;t request this code, you can safely ignore this
                email. Your account remains secure.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="text-center mt-8">
              <Text className="text-xs text-gray-400 mb-2">
                You&apos;re receiving this email because you requested a
                verification code for {appName}.
              </Text>
              <Text className="text-xs text-gray-400">
                © {new Date().getFullYear()}{" "}
                <Link href="https://github.com/21Chillie">Chillie</Link>. All
                rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
