import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from '@react-email/components'

import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  floorPlanUrl?: string
}

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '28px 24px', maxWidth: '560px' }
const heading = { fontSize: '22px', color: '#1b1b1f', margin: '0 0 8px' }
const text = { fontSize: '15px', lineHeight: '24px', color: '#3b3b42' }
const small = { fontSize: '12px', lineHeight: '20px', color: '#8a8a93' }
const button = {
  backgroundColor: '#b08a3e',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 700,
  padding: '13px 26px',
  borderRadius: '6px',
  textDecoration: 'none',
  display: 'inline-block',
  margin: '8px 0 16px',
}

const Email = ({ name, floorPlanUrl }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your Vyomora floor plans & price breakup</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Thank you{name ? `, ${name}` : ''}!</Heading>
        <Text style={text}>
          Here are the floor &amp; unit plans for Vyomora, Hinjawadi by Shapoorji Pallonji. Our
          sales desk will call you shortly with the complete price breakup and current offers.
        </Text>
        {floorPlanUrl ? (
          <Button href={floorPlanUrl} style={button}>
            Download floor &amp; unit plans
          </Button>
        ) : null}
        <Hr />
        <Text style={small}>
          You are receiving this email because you requested project details on the Vyomora
          website.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Your Vyomora floor plans & price breakup',
  displayName: 'Lead confirmation with floor plans',
  previewData: {
    name: 'Rahul',
    floorPlanUrl: 'https://shapoorjipallonjivyomora.site/',
  },
} satisfies TemplateEntry
