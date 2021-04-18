import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"
import Stripe from 'stripe'
import products from "../../categories/methods/products"

export default function (cartRepo: any, appRepo: any, config: any) {
  return async function (req: Request, res: Response) {
    // params
    let es = req.body.params // event source

    // authentication
    let decoded: any = jwt.verify(es.arguements.token, process.env.SECRET)
    console.log('decoded:', decoded)
    
    // check if userId from token is the owner to provided cart id
    const cart = await cartRepo.findOne({
      select: ['id', 'raw'],
      relations: ['app', 'products'],
      where: {
        id: es.arguements.id,
        appId: es.arguements.appId,
        userId: decoded.userId
      }
    })
    if (!cart) {
      // end
      es.payload = {
        success: false,
        reason: 'userId from token is not the owner to provided cart id or cart does not exist'
      }
      es.serverAt = Date.now()
      console.log(`API ${es.arguements.url} ::: ${es}`)
      res.json(es)
    }

    // line items
    let li = []
    cart.products.forEach((product, index) => {
      li.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            // image display is broken on stripe's end; hmmm.
            // images: [`${cart.app.uploads}/${product.image}`], 
          },
          unit_amount: product.price,
        },
        quantity: cart.raw[product.slug],
      })
    })

    let session
    try {
      let stripe
      if (cart.app.isStripeTestData) {
        stripe = new Stripe(cart.app.stripeSecretKeyTest, {
          apiVersion: '2020-08-27',
        })
      } else {
        stripe = new Stripe(cart.app.stripeSecretKeyLive, {
          apiVersion: '2020-08-27',
        })
      }

      // perform
      session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        shipping_address_collection: {
          allowed_countries: ['US', 'CA'],
        },
        payment_method_types: ['card'],
        line_items: li,
        mode: 'payment',
        success_url: `https://shop.${cart.app.domain}/checkout/success`,
        cancel_url: `https://shop.${cart.app.domain}/checkout/cancel`,
      });
    } catch (e) {
      es.payload = {
        success: false,
        reason: e.raw.message
      }
      es.serverAt = Date.now()
      console.log(`API ${es.arguements.url} ::: ${es}`)
      res.json(es)
    }


    let result 
    if (session) {
      result = {
        success: true,
        data: { id: session.id }
      }
    } else {
      result = {
        success: false,
        reason: 'something went wrong with stripe'
      }
    }


    // add to event source
    es.payload = result
    es.serverAt = Date.now()

    // log event source
    console.log(`API ${es.arguements.url} ::: ${es}`)

    // finish
    res.json(es)
  }
}