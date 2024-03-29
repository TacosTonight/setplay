import copy

page_of_setlists = {
    "type": "setlists",
    "itemsPerPage": 3,
    "page": 1,
    "total": 786,
    "setlist": [
        {
            "id": "63beeaaf",
            "versionId": "g5be67360",
            "eventDate": "30-10-2022",
            "lastUpdated": "2022-11-01T11:05:50.000+0000",
            "artist": {
                "mbid": "4b0dd5e7-c795-42bd-8311-bc9f71fabd0a",
                "name": "Counterparts",
                "sortName": "Counterparts",
                "disambiguation": "Canadian melodic hardcore band",
                "url": "https://www.setlist.fm/setlists/counterparts-3bd26c28.html"
            },
            "venue": {
                "id": "1bd5b5bc",
                "name": "Yellow Arch Studios",
                "city": {
                    "id": "2638077",
                    "name": "Sheffield",
                    "state": "England",
                    "stateCode": "ENG",
                    "coords": {
                        "lat": 53.383,
                        "long": -1.466
                    },
                    "country": {
                        "code": "GB",
                        "name": "United Kingdom"
                    }
                },
                "url": "https://www.setlist.fm/venue/yellow-arch-studios-sheffield-england-1bd5b5bc.html"
            },
            "tour": {
                "name": "A Eulogy for Those Still Here"
            },
            "sets": {
                "set": []
            },
            "info": "\"Burn\" and \"Compass\" were on the setlist but not played due to time constraints",
            "url": "https://www.setlist.fm/setlist/counterparts/2022/yellow-arch-studios-sheffield-england-63beeaaf.html"
        },
        {
            "id": "bbee146",
            "versionId": "g73e65285",
            "eventDate": "28-10-2022",
            "lastUpdated": "2022-11-02T22:28:19.000+0000",
            "artist": {
                "mbid": "4b0dd5e7-c795-42bd-8311-bc9f71fabd0a",
                "name": "Counterparts",
                "sortName": "Counterparts",
                "disambiguation": "Canadian melodic hardcore band",
                "url": "https://www.setlist.fm/setlists/counterparts-3bd26c28.html"
            },
            "venue": {
                "id": "bd6cd76",
                "name": "The Joiners Arms",
                "city": {
                    "id": "2637487",
                    "name": "Southampton",
                    "state": "England",
                    "stateCode": "ENG",
                    "coords": {
                        "lat": 50.9,
                        "long": -1.4
                    },
                    "country": {
                        "code": "GB",
                        "name": "United Kingdom"
                    }
                },
                "url": "https://www.setlist.fm/venue/the-joiners-arms-southampton-england-bd6cd76.html"
            },
            "tour": {
                "name": "A Eulogy for Those Still Here"
            },
            "sets": {
                "set": [
                    {
                        "song": [
                            {
                                "name": "song1"
                            },
                            {
                                "name": "Bound to the Burn"
                            },
                            {
                                "name": "Wings of Nightmares"
                            },
                        ]
                    }
                ]
            },
            "url": "https://www.setlist.fm/setlist/counterparts/2022/the-joiners-arms-southampton-england-bbee146.html"
        },
        {
            "id": "5bbeff8c",
            "versionId": "g4be67362",
            "eventDate": "27-10-2022",
            "lastUpdated": "2022-11-01T11:05:41.000+0000",
            "artist": {
                "mbid": "4b0dd5e7-c795-42bd-8311-bc9f71fabd0a",
                "name": "Counterparts",
                "sortName": "Counterparts",
                "disambiguation": "Canadian melodic hardcore band",
                "url": "https://www.setlist.fm/setlists/counterparts-3bd26c28.html"
            },
            "venue": {
                "id": "6bd47a32",
                "name": "The Key Club",
                "city": {
                    "id": "2644689",
                    "name": "Leeds",
                    "state": "England",
                    "stateCode": "ENG",
                    "coords": {
                        "lat": 51.2333333,
                        "long": 0.6166667
                    },
                    "country": {
                        "code": "GB",
                        "name": "United Kingdom"
                    }
                },
                "url": "https://www.setlist.fm/venue/the-key-club-leeds-england-6bd47a32.html"
            },
            "tour": {
                "name": "A Eulogy for Those Still Here"
            },
            "sets": {
                "set": [
                    {
                        "song": [
                            {
                                "name": "song1"
                            },
                            {
                                "name": "song2"
                            },
                            {
                                "name": "song3"
                            },
                            {
                                "name": "song4"
                            },
                            {
                                "name": "song5"
                            }
                        ]
                    },
                    {
                        "name": "subset2",
                        "song": [
                            {
                                "name": "song6"
                            },
                            {
                                "name": "song7"
                            },
                            {
                                "name": "song8"
                            },
                            {
                                "name": "song9"
                            },
                            {
                                "name": "song10"
                            },
                        ]
                    }
                ]
            },
            "info": "\"Unwavering Vow\" and \"Your Own Knife\" were cut from the setlist due to time constraints imposed by the venue due to a club night taking place shortly after the set ended",
            "url": "https://www.setlist.fm/setlist/counterparts/2022/the-key-club-leeds-england-5bbeff8c.html"
        },
    ]
}
page_of_setlists_no_full_set = copy.deepcopy(page_of_setlists)
page_of_setlists_no_full_set["setlist"][2]["sets"]["set"] = [
    {
        "song": [
            {
                "name": "song1"
            },
            {
                "name": "song2"
            },
            {
                "name": "song3"
            },
            {
                "name": "song4"
            },
        ]
    }
]

parsed_meta_data = {
  "artist": {
    "mbid": "4b0dd5e7-c795-42bd-8311-bc9f71fabd0a",
    "name": "Counterparts",
    "sortName": "Counterparts",
    "disambiguation": "Canadian melodic hardcore band",
    "url": "https://www.setlist.fm/setlists/counterparts-3bd26c28.html"
  },
    "venue": {
        "id": "1bd5b5bc",
        "name": "Yellow Arch Studios",
        "city": {
            "id": "2638077",
            "name": "Sheffield",
            "state": "England",
            "stateCode": "ENG",
            "coords": {
                "lat": 53.383,
                "long": -1.466
            },
            "country": {
                "code": "GB",
                "name": "United Kingdom"
            }
        },
        "url": "https://www.setlist.fm/venue/yellow-arch-studios-sheffield-england-1bd5b5bc.html"
    },
  "tour": { "name": "A Eulogy for Those Still Here" },
  "date": "30-10-2022",
}