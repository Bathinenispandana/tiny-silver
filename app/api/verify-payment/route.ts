import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentId, signature } = await request.json()

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify signature
    const keySecret = process.env.RAZORPAY_KEY_SECRET || ''
    const body = orderId + '|' + paymentId

    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body)
      .digest('hex')

    if (expectedSignature === signature) {
      // Payment verified successfully
      // In a production app, you would:
      // 1. Save the order to your database
      // 2. Update order status to "paid"
      // 3. Send confirmation email
      // 4. Trigger fulfillment process

      return NextResponse.json({
        success: true,
        message: 'Payment verified',
        orderId,
        paymentId,
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
