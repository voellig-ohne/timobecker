import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import Logo from './_logo'
import POINTS from './_points'

import 'style/main.less'

export default class Index extends React.Component {
    render () {
        const automatedOrders = []
        const orders = generatePermutations(POINTS.length)
        const ordersWithoutLoops = orders;

        let duplicatesDisplay;

        let ordersString = orders.map((order) => {
            return order.join('')
        })

        const uniques = []

        while (ordersString.length !== 0) {
            const ordering = ordersString[0]
            const duplicateGroup = []
            let shifted = ordering

            uniques.push(ordering.split(''))

            for (let i = 0; i < ordering.length; i++) {
                shifted = shiftOrder(shifted)
                const shiftedReverse = shifted.split('').reverse().join('')

                ordersString.splice(ordersString.indexOf(shifted), 1)
                ordersString.splice(ordersString.indexOf(shiftedReverse), 1)
            }
        }

        function shiftOrder (order) {
            const array = order.split('')
            array.push(array.shift())
            return array.join('')
        }

        const logos = uniques.map((order, index) => {
            const title = order.map((i) => {
                return i + ' '
            }).join('')

            return (
                <div className="tb_logo-wrapper"
                    key={index}>
                    <h2>{title}</h2>
                    <Logo
                        className="tb_logo"
                        points={POINTS}
                        order={order}
                        size={200}
                        margin={20}
                        showLabels={false} />
                </div>
            )
        })

        return (
            <DocumentTitle title={config.siteTitle}>
                <div>
                    <h1>{POINTS.length} POINTS, {uniques.length} variations: </h1>
                    {logos}
                </div>
            </DocumentTitle>
        )
    }
}

// http://stackoverflow.com/questions/9960908/permutations-in-javascript
function generatePermutations (length) {
    const input = []

    for (let i = 0; i < length; i++) {
        input.push(i)
    }

    const permArr = []
    const usedChars = []

    function permute(input) {
        let i, ch
        for (i = 0; i < input.length; i++) {
            ch = input.splice(i, 1)[0]
            usedChars.push(ch)
            if (input.length == 0) {
                permArr.push(usedChars.slice());
            }
            permute(input)
            input.splice(i, 0, ch)
            usedChars.pop()
        }
        return permArr
    };

    return permute(input)
}
