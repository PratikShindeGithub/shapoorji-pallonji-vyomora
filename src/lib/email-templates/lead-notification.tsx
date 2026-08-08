import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  mobile?: string
  email?: string
  city?: string
  intent?: string
  submittedAt?: string
}

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '24px', maxWidth: '560px' }
const heading = { fontSize: '20px', color: '#1b1b1f', margin: '0 0 4px' }
const sub = { fontSize: '13px', color: '#6b6b73', margin: '0 0 16px' }
const label = { fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#8a8a93', margin: '0' }
const value = { fontSize: '15px', color: '#1b1b1f', margin: '2px 0 12px', fontWeight: 600 }

const Row = ({ l, v }: { l: string; v: string }) => (
  <Section>
    <Text style={label}>{l}</Text>
    <Text style={value}>{v}</Text>
  </Section>
)

const Email = ({ name, mobile, email, city, intent, submittedAt }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`New Vyomora enquiry: ${name ?? 'Website lead'}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New enquiry from Vyomora website</Heading>
        <Text style={sub}>{submittedAt ? `Received ${submittedAt}` : 'Received just now'}</Text>
        <Hr />
        <Row l="Full name" v={name ?? '—'} />
        <Row l="Mobile number" v={mobile ?? '—'} />
        <Row l="Email address" v={email ?? '—'} />
        <Row l="Current city" v={city && city.length > 0 ? city : '—'} />
        <Row l="Form / intent" v={intent && intent.length > 0 ? intent : 'General enquiry'} />
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, unknown>) =>
    `New Vyomora enquiry — ${(data['name'] as string) || 'Website lead'}`,
  displayName: 'New lead notification (sales desk)',
  previewData: {
    name: 'Rahul Mehta',
    mobile: '9876543210',
    email: 'rahul@example.com',
    city: 'Pune',
    intent: 'price-breakup',
    submittedAt: '8 Aug 2026, 10:45 PM IST',
  },
} satisfies TemplateEntry
