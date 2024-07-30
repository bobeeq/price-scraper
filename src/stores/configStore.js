import { defineStore } from 'pinia';

export const useConfigStore = defineStore('configStore', {
    state() {
        return {
            auth: false,
            bookstores: {
                gandalf: {
                    name: 'gandalf',
                    delays: {
                        min: 5,
                        max: 7
                    },
                    productPages: {},
                    download: {
                        default: {
                            value: false,
                            async strategy(data) {
                                const {ean, thread} = data;
                                const res = await fetch(`https://www.gandalf.com.pl/sxa/${ean.code}`, {mode: 'cors'});
                                const text = await res.text();
                                const dom = (new DOMParser()).parseFromString(text, 'text/html');

                                const price = dom.querySelector('ul.internal-list span.current-price.f-20.bold-700')?.textContent.trim().replaceAll(/[^\d,]/g, '') ?? '-';

                                const urlToProduct = dom.querySelector('ul.internal-list .info-box a:first-child')?.href;
                                useConfigStore().bookstores['gandalf'].productPages[ean.code] = urlToProduct;
                                if(!ean.prices[thread.name]) {
                                    ean.prices[thread.name] = {};
                                }
                                ean.prices[thread.name].default = price;
                            }
                        },
                        google: {
                            value: false,
                            async strategy(data) {
                                const {ean, thread} = data;
                                const url = useConfigStore().bookstores['gandalf'].productPages[ean.code];

                                if(!url) return;
                                const sign = url.match(/\?/) ? '&' : '?';
                                const res = await fetch(`${url}${sign}utm_source=google`, {mode: 'cors'});
                                const text = await res.text();
                                const dom = (new DOMParser()).parseFromString(text, 'text/html');

                                const price = dom.querySelector('.internal-price-box .current-price strong')?.textContent.trim().replaceAll(/[^\d,]/g, '') ?? '-';

                                if(!ean.prices[thread.name]) {
                                    ean.prices[thread.name] = {};
                                }
                                ean.prices[thread.name].google = price;
                            }
                        }
                    },
                    searchURL: ``,
                },
                // bonito: {
                //     name: 'bonito',
                //     delays: {
                //         min: 10,
                //         max: 15
                //     },
                //     download: {
                //         default: {
                //             value: false,
                //             async strategy(data) {
                //                 const {ean, thread} = data;
                //                 const res = await fetch(
                //                     `https://classic.bonito.pl/szukaj/${ean.code}/1,0,0/0`,
                //                     {
                //                         method: 'GET',
                //                         credentials: 'include',
                //                         mode: 'cors',
                //                         headers: {
                //                             'Host': 'classic.bonito.pl',
                //                             'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0',
                //                             'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                //                             'Accept-Language': 'pl,en-US;q=0.7,en;q=0.3',
                //                             'Accept-Encoding': 'gzip, deflate, br',
                //                             'DNT': '1',
                //                             'Upgrade-Insecure-Requests': '1',
                //                             'Connection': 'keep-alive',
                //                             'Sec-Fetch-Dest': 'document',
                //                             'Sec-Fetch-Mode': 'navigate',
                //                             'Sec-Fetch-Site': 'none',
                //                             'Sec-Fetch-User': '?1',
                //                             'Sec-GPC': '1'
                //                         }
                //                     }
                //                 );
                //                 const text = await res.text();
                //                 const dom = (new DOMParser()).parseFromString(text, 'text/html');

                //                 const price = dom.querySelector('font[color="black"][style="font-size: 12pt;"] > b')?.textContent.trim().replaceAll(/[^\d,]/g, '');

                //                 const urlToProduct = dom.querySelector('ul.internal-list .info-box a:first-child')?.href;
                //                 useConfigStore().bookstores['gandalf'].productPages[ean.code] = urlToProduct;
                //                 if(!ean.prices[thread.name]) {
                //                     ean.prices[thread.name] = {};
                //                 }
                //                 ean.prices[thread.name].default = price;
                //             }
                //         },
                //         google: {
                //             value: false,
                //         }
                //     },
                //     searchURL: ``,
                // },
                tantis: {
                    name: 'tantis',
                    delays: {
                        min: 6,
                        max: 8
                    },
                    productPages: {},
                    download: {
                        default: {
                            value: false,
                            async strategy(data) {
                                const {ean, thread} = data;
                                const res = await fetch(`https://tantis.pl/szukaj?query=${ean.code}`, {credentials: 'include', mode: 'cors'});
                                const text = await res.text();
                                const dom = (new DOMParser()).parseFromString(text, 'text/html');

                                const price = dom.querySelector('div#productGridRow span.product-price')?.textContent.trim().replaceAll(/[^\d,]/g, '') ?? '-';

                                const urlToProduct = dom.querySelector('div#productGridRow h3.card-title.product-name > a')?.href;
                                useConfigStore().bookstores['tantis'].productPages[ean.code] = urlToProduct;

                                if(!ean.prices[thread.name]) {
                                    ean.prices[thread.name] = {};
                                }
                                ean.prices[thread.name].default = price;
                            }
                        },
                        google: {
                            value: false,
                            async strategy(data) {
                                const {ean, thread} = data;
                                const url = useConfigStore().bookstores['tantis'].productPages[ean.code];

                                if(!url) return;
                                const sign = url.match(/\?/) ? '&' : '?';
                                const res = await fetch(`${url}${sign}utm_source=google`, {mode: 'cors'});
                                const text = await res.text();
                                const dom = (new DOMParser()).parseFromString(text, 'text/html');

                                const price = dom.querySelector('#main-product-sidebar .ui-price-lg')?.textContent?.trim().replaceAll(/[^\d,]/g, '') ?? '-';

                                if(!ean.prices[thread.name]) {
                                    ean.prices[thread.name] = {};
                                }
                                ean.prices[thread.name].google = price;
                            }
                        }
                    },
                    searchURL: ``,
                },
                // 'świat_książki': {
                //     name: 'świat_książki',
                //     delays: {
                //         min: 2,
                //         max: 4
                //     },
                //     download: {
                //         default: {
                //             value: false,
                //             async strategy(data) {
                //                 const {ean, thread} = data;

                //                 const res = await fetch(`https://www.swiatksiazki.pl/search/${ean.code}`, {
                //                     mode: 'cors',
                //                     credentials: 'include',
                //                     headers: {'User-Agent': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/W.X.Y.Z Safari/537.36'}
                //                 })
                //                 const text = await res.text();
                //                 const dom = (new DOMParser()).parseFromString(text, 'text/html');

                //                 const price = dom.querySelector('ul.ProductListPage .ProductPrice-PriceValue')?.textContent.replaceAll(/[^\d,]/, '') ?? '-';

                //                 ean.prices[thread.name].default = price;
                //             }
                //         },
                //         google: {
                //             value: false,
                //         }
                //     },
                //     searchURL: ``,
                // },
                empik_lc: {
                    name: 'empik_lc',
                    delays: {
                        min: 2,
                        max: 4
                    },
                    download: {
                        default: {
                            value: false,
                            async strategy(data) {
                                const {ean, thread} = data;
                                fetch(`https://buybox.click/17929/buybox.json?number[]=${data.ean.code}`)
                                .then(res => res.json()).then(jsonData => {
                                    for(const row of Object.values(jsonData.data)) {
                                        if(row.name != 'empik.com' || row.typeName != 'książka') continue;

                                        
                                        if(!ean.prices[thread.name]) {
                                            ean.prices[thread.name] = {};
                                        }

                                        ean.prices[thread.name].default = row.price?.replace('.', ',') ?? '-';
                                    }
                                });
                            }
                        },
                        google: {
                            value: false,
                        }
                    },
                    searchURL: ``,
                },
                smyk: {
                    name: 'smyk',
                    delays: {
                        min: 5,
                        max: 7
                    },
                    download: {
                        default: {
                            value: false,
                            async strategy(data) {
                                const {ean, thread} = data;
                                const res = await fetch(`https://www.smyk.com/search?q=${ean.code}`, {credentials: 'include', mode: 'cors'});

                                const text = await res.text();
                                const dom = (new DOMParser()).parseFromString(text, 'text/html');
                                console.log(thread);

                                let price = '-';

                                if(dom.querySelector('.grid__headline--find')?.textContent.match(/[^\d]1[^\d]/)) {
                                    price = dom.querySelector('.price--new')?.textContent.trim().replaceAll(/[^\d,]/g, '') ?? '-';
                                }
                                if(!ean.prices[thread.name]) {
                                    ean.prices[thread.name] = {};
                                }
                                ean.prices[thread.name].default = price;




                                // const match = text.match(/script>\s*?window.PRELOADED_STATE\s*?=\s*?(?<json>.*?)\s*;\s*<\/script>/).groups?.json?.trim();
                                // if(match) {
                                //     console.log(JSON.parse(match));
                                // }

                            }
                        },
                        google: {
                            value: false
                        }
                    }
                },
                bookland: {
                    name: 'bookland',
                    delays: {
                        min: 5,
                        max: 7
                    },
                    download: {
                        default: {
                            value: false,
                            async strategy(data) {
                                const {ean, thread} = data;
                                const res = await fetch(`https://bookland.com.pl/graphql?hash=2333236514&sort_1={"availability":"DESC"}&filter_1={"price":{},"customer_group_id":{"eq":"0"}}&search_1="${ean.code}"&pageSize_1=24&currentPage_1=1&_currency=""`, {credentials: 'include', mode: 'cors'});

                                const json = await res.json();
                                console.log(thread);

                                let price = json.data.products.items[0]?.price_range.maximum_price.final_price.value.toFixed(2).replace('.', ',') ?? '-';

                                let googlePrice = json.data.products.items[0]?.attributes
                                    .filter(a => a.attribute_code == 'google_tax_adv_discount_price')[0]?.attribute_value;
                                
                                if(googlePrice) {
                                    googlePrice = parseFloat(googlePrice).toFixed(2).replace('.', ',');
                                } else {
                                    googlePrice = "-";
                                }

                                let ceneoPrice = json.data.products.items[0]?.attributes
                                .filter(a => a.attribute_code == 'ceneo_tax_adv_discount_price')[0]?.attribute_value;

                                if(ceneoPrice) {
                                    ceneoPrice = parseFloat(ceneoPrice).toFixed(2).replace('.', ',');
                                } else {
                                    ceneoPrice = "-";
                                }
                                

                                if(!ean.prices[thread.name]) {
                                    ean.prices[thread.name] = {};
                                }

                                ean.prices[thread.name].default = `${price};${googlePrice};${ceneoPrice}`;
                            }
                        },
                        google: {
                            value: false
                        }
                    }
                }
            },
        }
    },
    actions: {
        activateDownload(bookstore, type) {
            if(this.canBeDownloaded(bookstore, type)) {
                this.bookstores[bookstore].download[type].value = true;
            }
        },
        deactivateDownload(bookstore, type) {
            this.bookstores[bookstore].download[type].value = false;
        },
        canBeDownloaded(bookstore, type) {
            return this.bookstores[bookstore].download[type].strategy;
        },
        isDownloading(bookstore, type) {
            return this.bookstores[bookstore].download[type].value;
        },
        isBookstoreActive(bookstore) {
            return this.bookstores[bookstore].download['default'].value
                || this.bookstores[bookstore].download['google'].value
        },
    },

    getters: {
        anythingToDownload() {
            for(const bookstore of Object.values(this.bookstores)) {
                for(const download of Object.values(bookstore.download)) {
                    if(download.value) return true;
                }
            }

            return false;
        },

        activeDownloads() {
            const activeDownloads = [];
            for(const bookstore in this.bookstores) {
                for(const download in this.bookstores[bookstore].download) {
                    if(this.bookstores[bookstore].download[download].value) {
                        activeDownloads.push([bookstore, download]);
                    }
                }
            }

            return activeDownloads;
        }
    }
});