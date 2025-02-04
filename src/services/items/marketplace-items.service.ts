import { convertObjectForUrlSearchParams } from '../../helpers/object.helper'

export interface ItemMinPriceTradeTypeInfo extends ItemInfo {
    tradableMinPrice: number | undefined
    nonTradableMinPrice: number | undefined
}

interface ItemInfo {
    market_hash_name: string
    currency: string
    item_page: string
    market_page: string
}

interface ItemFullInfo extends ItemInfo {
    quantity: number
    created_at: number
    updated_at: number
    suggested_price: number
    max_price: number
    mean_price: number
    median_price: number
    min_price: number
}

interface QueryParams {
    app_id: number
    currency: string
    tradable: boolean
}

class MarketplaceItemsService {
    private readonly baseUrl = 'https://api.skinport.com/v1/items'

    public async fetchLowestPriceItems(appId: number = 730, currency: string = 'EUR'): Promise<ItemMinPriceTradeTypeInfo[]> {
        const [tradableItems, nonTradableItems] = await Promise.all([
            this.fetch({
                app_id: appId,
                currency: currency,
                tradable: true,
            }),
            this.fetch({
                app_id: appId,
                currency: currency,
                tradable: false,
            }),
        ])

        return this.findMinTradeTypePrices(tradableItems, nonTradableItems)
    }

    private async fetch(query: QueryParams): Promise<ItemFullInfo[]> {
        const params = new URLSearchParams(convertObjectForUrlSearchParams(query))

        const response = await fetch(`${this.baseUrl}?${params}`, {
            method: 'GET',
            headers: {
                'Accept-Encoding': 'br',
            },
        })

        return await response.json()
    }

    private findMinTradeTypePrices(tradableItems: ItemFullInfo[], nonTradableItems: ItemFullInfo[]): ItemMinPriceTradeTypeInfo[] {
        const itemsMap = new Map<string, ItemFullInfo>()

        let itemsForMap: ItemFullInfo[]
        let itemsForIter: ItemFullInfo[]

        let iterItemsTradeType: 'tradable' | 'nonTradable'

        if (tradableItems.length < nonTradableItems.length) {
            itemsForMap = tradableItems
            itemsForIter = nonTradableItems
            iterItemsTradeType = 'nonTradable'
        } else {
            itemsForMap = nonTradableItems
            itemsForIter = tradableItems
            iterItemsTradeType = 'tradable'
        }

        itemsForMap.forEach(item => itemsMap.set(item.market_hash_name, item))

        return itemsForIter.map(item => {
            const otherTradeTypeItem = itemsMap.get(item.market_hash_name)
            return {
                market_hash_name: item.market_hash_name,
                currency: item.currency,
                item_page: item.item_page,
                market_page: item.market_page,
                tradableMinPrice: iterItemsTradeType === 'tradable' ? item.min_price : otherTradeTypeItem?.min_price,
                nonTradableMinPrice: iterItemsTradeType === 'nonTradable' ? item.min_price : otherTradeTypeItem?.min_price,
            }
        })
    }
}

export const marketPlaceService = new MarketplaceItemsService()