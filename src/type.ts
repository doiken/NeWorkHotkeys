type StorageCache = {
    apiCache: QiitaApiCache,
    searchQueries: QiitaApiQuery[]
}

declare namespace QiitaApiCache {
    type NeiborMap = {
        [current_url: string]: QiitaApiCache.NeiborMap.Neibors
    }
    namespace NeiborMap {
        type Neibors = {
            prev?: string,
            next?: string,
        }
    }
}
type QiitaApiCache = {
    [search_query_id: number]: {
        cachedAt: number,
        neiborMap: QiitaApiCache.NeiborMap
    }
}
type QiitaApiQuery = {
    id: number,
    domain: string,
    query: string,
    token: string,
    isActive: boolean,
}