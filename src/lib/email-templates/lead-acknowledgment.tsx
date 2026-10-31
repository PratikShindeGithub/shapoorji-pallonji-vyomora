import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'

import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  interestedVariant?: string
}

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '32px 24px', maxWidth: '560px' }
const brand = {
  fontSize: '13px',
  letterSpacing: '0.35em',
  textTransform: 'uppercase' as const,
  color: '#b08d3c',
  fontWeight: 700,
  margin: '0 0 12px',
  textAlign: 'center' as const,
}
const heading = {
  fontSize: '24px',
  color: '#1b1b1f',
  margin: '0 0 20px',
  textAlign: 'center' as const,
}
const para = { fontSize: '15px', lineHeight: '1.6', color: '#3a3a42', margin: '0 0 16px' }
const phone = { color: '#b08d3c', fontWeight: 700, textDecoration: 'none' }

const Email = ({ name, interestedVariant }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your enquiry has been submitted — Vyomora, Hinjawadi Phase 1</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>Vyomora</Text>
        <Heading style={heading}>Thank you for your enquiry</Heading>
        <Text style={para}>Dear {name && name.trim().length > 0 ? name : 'Customer'},</Text>
        <Text style={para}>
          Your enquiry has been submitted successfully. Our team will get in touch with you
          shortly to assist you further.
        </Text>
        <Text style={para}>
          Vyomora — premium {interestedVariant && interestedVariant.trim().length > 0 ? interestedVariant : '2, 3 & 4 BHK'} residences at
          Hinjawadi Phase 1, Pune, by Shapoorji Pallonji.
        </Text>
        <Text style={para}>
          For any immediate assistance, call us at{' '}
          <Link href="tel:+919175892774" style={phone}>
            +91 91758 92774
          </Link>
          .
        </Text>
        <Text style={para}>
          Warm regards,
          <br />
          Team Vyomora
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Your enquiry has been submitted — Vyomora, Hinjawadi Phase 1',
  displayName: 'Customer enquiry acknowledgment',
  previewData: { name: 'Rahul Mehta', interestedVariant: '2 BHK' },
} satisfies TemplateEntry
