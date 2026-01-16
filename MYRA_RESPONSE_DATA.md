# Myra Response Data Structure

## Main Response (Line 51-52 in logs)

This is the actual hotel data response that gets sent to WhatsApp:

```json
{
  "eventType": "NEW_MESSAGE",
  "data": {
    "eventType": "ASSISTANT_REPLY",
    "conversationId": "eb5d8560-bf91-4ee7-bb24-9f760c419848",
    "showOverlay": false,
    "message": {
      "showBookmarkFeedback": true,
      "bookmarkFlag": false,
      "highlightBookmark": false,
      "isCompleted": false,
      "id": "bd5dfc80-92d0-47c6-a471-07cc757adfc8",
      "role": "ASSISTANT",
      "createdAt": 1768557811474,
      "lang": "en-IN",
      "content": [
        {
          "contentId": "2jESVhwS",
          "type": "TEXT",
          "value": "**Discover your Jaipur stay from Jan 23 to Jan 24 for 2 adults in 1 room** – Here are the top options for you:\n- **UMAID FARM RESORT – A LEGACY VINTAGE STAY IN JAIPUR**: Nestled on a 5‑acre farm, this heritage‑styled resort offers a large swimming pool, outdoor activities, and spacious Royal Suites with private balconies. Guests love the tranquil setting and extensive facilities, though some feel room ambiance could better match the resort's promise. Perfect for a relaxed getaway.\n- **FabHotel Capitol Square**: Located in Jaipur, this property provides a convenient urban stay with standard amenities suitable for travelers seeking city access.\n- **Sunflower Saga**: A picturesque retreat ideal for couples, featuring colorful cottages, a private jacuzzi, swimming pool, and bonfire pit. The peaceful location adds to the romantic vibe, though the entry road can be a bit rough.\n- **SPOT ON Aradhana home stay**: A home‑style accommodation in Jaipur offering a cozy, local experience.\n- **FabHotel Pink Haveli**: Situated just 1.1 km from Chowki Dhani, this hotel delivers a charming stay with classic amenities in a central Jaipur location."
        },
        {
          "contentId": "Fe8HoncG",
          "type": "CARD",
          "value": {
            "fallbackText": "**Discover your Jaipur stay from Jan 23 to Jan 24 for 2 adults in 1 room** – Here are the top options for you:\n- **UMAID FARM RESORT – A LEGACY VINTAGE STAY IN JAIPUR**: Nestled on a 5‑acre farm, this heritage‑styled resort offers a large swimming pool, outdoor activities, and spacious Royal Suites with private balconies. Guests love the tranquil setting and extensive facilities, though some feel room ambiance could better match the resort's promise. Perfect for a relaxed getaway.\n- **FabHotel Capitol Square**: Located in Jaipur, this property provides a convenient urban stay with standard amenities suitable for travelers seeking city access.\n- **Sunflower Saga**: A picturesque retreat ideal for couples, featuring colorful cottages, a private jacuzzi, swimming pool, and bonfire pit. The peaceful location adds to the romantic vibe, though the entry road can be a bit rough.\n- **SPOT ON Aradhana home stay**: A home‑style accommodation in Jaipur offering a cozy, local experience.\n- **FabHotel Pink Haveli**: Situated just 1.1 km from Chowki Dhani, this hotel delivers a charming stay with classic amenities in a central Jaipur location.",
            "templateInfo": {
              "templateId": "detailed-card",
              "templateVersion": "1",
              "uiLayout": {
                "scrollType": "HORIZONTAL",
                "shouldApplyGradient": true
              },
              "payload": [
                {
                  "id": "202002031633193875",
                  "type": "detailed-card",
                  "data": {
                    "expert_source": "hotels LLM",
                    "lob": "HTL",
                    "cta_link": "https://www.makemytrip.com/hotels/hotel-details?hotelId=202002031633193875&checkin=01232026&checkout=01242026&country=IN&city=CTJAI&openDetail=true&currency=INR&roomStayQualifier=2e0e&locusId=CTJAI&locusType=city&region=in&viewType=PREMIUM&funnelName=HOTELS&rsc=1e2e&mpn=false",
                    "insight_data": {
                      "should_stream": true,
                      "text": null
                    },
                    "cta_title": "Starting at ₹9,276/night",
                    "title": "UMAID FARM RESORT-A LEGACY VINTAGE STAY IN JAIPUR",
                    "meta": [
                      {
                        "lob": "HTL",
                        "product_id": "202002031633193875",
                        "sector": "CTJAI"
                      }
                    ],
                    "image_url": "https://r1imghtlak.mmtcdn.com/17b90a45-e955-4b0b-9d60-915ff1de993a.jpg?output-quality=75&downsize=243:162&output-format=jpg",
                    "sub_title_icon": "https://jsak.mmtcdn.com/pwa/platform-myra-ui/static/sub_icons/hotel.webp",
                    "id": "202002031633193875",
                    "sub_title": "Jaipur, Jaipur",
                    "info": {
                      "sub_text": "35",
                      "icon": "rating",
                      "text": "4.5"
                    },
                    "description": null
                  },
                  "bookmarkFlag": false,
                  "highlightBookmark": false,
                  "bookmarkedAt": 0
                },
                {
                  "id": "202511031149214146",
                  "type": "detailed-card",
                  "data": {
                    "expert_source": "hotels LLM",
                    "lob": "HTL",
                    "cta_link": "https://www.makemytrip.com/hotels/hotel-details?hotelId=202511031149214146&checkin=01232026&checkout=01242026&country=IN&city=CTJAI&openDetail=true&currency=INR&roomStayQualifier=2e0e&locusId=CTJAI&locusType=city&region=in&funnelName=HOTELS&rsc=1e2e&mpn=false",
                    "insight_data": {
                      "should_stream": true,
                      "text": null
                    },
                    "cta_title": "Starting at ₹1,481/night",
                    "title": "FabHotel Capitol Square",
                    "meta": [
                      {
                        "lob": "HTL",
                        "product_id": "202511031149214146",
                        "sector": "CTJAI"
                      }
                    ],
                    "image_url": "https://r1imghtlak.mmtcdn.com/e9b68ad3-903e-4f13-80be-d90a976a32cf.png?output-quality=75&downsize=243:162&output-format=jpg",
                    "sub_title_icon": "https://jsak.mmtcdn.com/pwa/platform-myra-ui/static/sub_icons/hotel.webp",
                    "id": "202511031149214146",
                    "sub_title": "Jaipur, Jaipur",
                    "info": {
                      "sub_text": "8",
                      "icon": "rating",
                      "text": "2.6"
                    },
                    "description": null
                  },
                  "bookmarkFlag": false,
                  "highlightBookmark": false,
                  "bookmarkedAt": 0
                },
                {
                  "id": "202403261928511903",
                  "type": "detailed-card",
                  "data": {
                    "expert_source": "hotels LLM",
                    "lob": "HTL",
                    "cta_link": "https://www.makemytrip.com/hotels/hotel-details?hotelId=202403261928511903&checkin=01232026&checkout=01242026&country=IN&city=CTJAI&openDetail=true&currency=INR&roomStayQualifier=2e0e&locusId=CTJAI&locusType=city&region=in&viewType=PREMIUM&funnelName=HOTELS&rsc=1e2e&mpn=false",
                    "insight_data": {
                      "should_stream": true,
                      "text": null
                    },
                    "cta_title": "Starting at ₹7,677/night",
                    "title": "Sunflower Saga",
                    "meta": [
                      {
                        "lob": "HTL",
                        "product_id": "202403261928511903",
                        "sector": "CTJAI"
                      }
                    ],
                    "image_url": "https://r1imghtlak.mmtcdn.com/1595fcd1-efbc-4d23-96fb-5e2cc5706c12.jpg?output-quality=75&downsize=243:162&output-format=jpg",
                    "sub_title_icon": "https://jsak.mmtcdn.com/pwa/platform-myra-ui/static/sub_icons/hotel.webp",
                    "id": "202403261928511903",
                    "sub_title": "Jaipur, Jaipur",
                    "info": {
                      "sub_text": "45",
                      "icon": "rating",
                      "text": "4.2"
                    },
                    "description": null
                  },
                  "bookmarkFlag": false,
                  "highlightBookmark": false,
                  "bookmarkedAt": 0
                },
                {
                  "id": "202408281452425198",
                  "type": "detailed-card",
                  "data": {
                    "expert_source": "hotels LLM",
                    "lob": "HTL",
                    "cta_link": "https://www.makemytrip.com/hotels/hotel-details?hotelId=202408281452425198&checkin=01232026&checkout=01242026&country=IN&city=CTJAI&openDetail=true&currency=INR&roomStayQualifier=2e0e&locusId=CTJAI&locusType=city&region=in&funnelName=HOTELS&rsc=1e2e&mpn=false",
                    "insight_data": {
                      "should_stream": true,
                      "text": null
                    },
                    "cta_title": "Starting at ₹866/night",
                    "title": "SPOT ON Aradhana home stay",
                    "meta": [
                      {
                        "lob": "HTL",
                        "product_id": "202408281452425198",
                        "sector": "CTJAI"
                      }
                    ],
                    "image_url": "https://r1imghtlak.mmtcdn.com/5e7e3826651e11efb5c20a58a9feac02.jpg?output-quality=75&downsize=243:162&output-format=jpg",
                    "sub_title_icon": "https://jsak.mmtcdn.com/pwa/platform-myra-ui/static/sub_icons/hotel.webp",
                    "id": "202408281452425198",
                    "sub_title": "Jaipur, Jaipur",
                    "info": null,
                    "description": null
                  },
                  "bookmarkFlag": false,
                  "highlightBookmark": false,
                  "bookmarkedAt": 0
                },
                {
                  "id": "202511031245106239",
                  "type": "detailed-card",
                  "data": {
                    "expert_source": "hotels LLM",
                    "lob": "HTL",
                    "cta_link": "https://www.makemytrip.com/hotels/hotel-details?hotelId=202511031245106239&checkin=01232026&checkout=01242026&country=IN&city=CTJAI&openDetail=true&currency=INR&roomStayQualifier=2e0e&locusId=CTJAI&locusType=city&region=in&funnelName=HOTELS&rsc=1e2e&mpn=false",
                    "insight_data": {
                      "should_stream": true,
                      "text": null
                    },
                    "cta_title": "Starting at ₹988/night",
                    "title": "FabHotel Pink Haveli",
                    "meta": [
                      {
                        "lob": "HTL",
                        "product_id": "202511031245106239",
                        "sector": "CTJAI"
                      }
                    ],
                    "image_url": "https://r1imghtlak.mmtcdn.com/a8f8fbbe-44c8-46f9-95c6-7a597b9e0983.jpg?output-quality=75&downsize=243:162&output-format=jpg",
                    "sub_title_icon": "https://jsak.mmtcdn.com/pwa/platform-myra-ui/static/sub_icons/hotel.webp",
                    "id": "202511031245106239",
                    "sub_title": "Jaipur, Jaipur",
                    "info": null,
                    "description": null
                  },
                  "bookmarkFlag": false,
                  "highlightBookmark": false,
                  "bookmarkedAt": 0
                }
              ],
              "others": {
                "view_all": {
                  "cta_title": "",
                  "count": 5,
                  "link": "https://www.makemytrip.com/hotels/hotel-listing/?checkin=01232026&checkout=01242026&city=CTJAI&country=IN&roomStayQualifier=2e0e&checkAvailability=false&_uCurrency=INR&locusId=CTJAI&locusType=city&region=in&funnelName=HOTELS&rsc=1e2e&myraMsgId=04efe105-3f4e-4b04-bbbe-1f416303f453&cityName=Jaipur&searchText="
                },
                "fallback_text": "**Discover your Jaipur stay from Jan 23 to Jan 24 for 2 adults in 1 room** – Here are the top options for you:\n- **UMAID FARM RESORT – A LEGACY VINTAGE STAY IN JAIPUR**: Nestled on a 5‑acre farm, this heritage‑styled resort offers a large swimming pool, outdoor activities, and spacious Royal Suites with private balconies. Guests love the tranquil setting and extensive facilities, though some feel room ambiance could better match the resort's promise. Perfect for a relaxed getaway.\n- **FabHotel Capitol Square**: Located in Jaipur, this property provides a convenient urban stay with standard amenities suitable for travelers seeking city access.\n- **Sunflower Saga**: A picturesque retreat ideal for couples, featuring colorful cottages, a private jacuzzi, swimming pool, and bonfire pit. The peaceful location adds to the romantic vibe, though the entry road can be a bit rough.\n- **SPOT ON Aradhana home stay**: A home‑style accommodation in Jaipur offering a cozy, local experience.\n- **FabHotel Pink Haveli**: Situated just 1.1 km from Chowki Dhani, this hotel delivers a charming stay with classic amenities in a central Jaipur location.",
                "cards_header": {
                  "subTitle": null,
                  "source": null,
                  "destination": null,
                  "date": null,
                  "isRoundTrip": null,
                  "title": "Recommended Stay Options",
                  "icon": "https://gos3.ibcdn.com/tpx_hotel-1760682299.png",
                  "journey_info": null
                },
                "contextMenuDataMap": {
                  "ctx_oc": [
                    {
                      "text": "Bookmark",
                      "icon": "bookmark",
                      "action": "bookmark"
                    }
                  ]
                }
              }
            }
          }
        }
      ]
    }
  },
  "uiMetadata": {
    "tempId": "1768557802049",
    "clientTraceId": "1768557802049-4"
  },
  "success": true
}
```

## Follow-up Response (Line 65-66 in logs)

This is a follow-up message with suggestions that comes after the main response:

```json
{
  "eventType": "NEW_MESSAGE",
  "data": {
    "eventType": "ASSISTANT_REPLY",
    "conversationId": "eb5d8560-bf91-4ee7-bb24-9f760c419848",
    "suggestions": [
      "Show me hotels with a pool",
      "Find hotels with better ratings"
    ],
    "suggestionsNew": [
      {
        "text": "Show me hotels with a pool"
      },
      {
        "text": "Find hotels with better ratings"
      }
    ],
    "ctas": [],
    "leadingQuestion": "Based on the options shown, do any of these hotels look like a good fit for your stay in Jaipur?",
    "showOverlay": false,
    "message": {
      "showBookmarkFeedback": true,
      "bookmarkFlag": false,
      "highlightBookmark": false,
      "isCompleted": true,
      "id": "bd5dfc80-92d0-47c6-a471-07cc757adfc8",
      "role": "ASSISTANT",
      "createdAt": 1768557812926,
      "lang": "en-IN",
      "content": []
    }
  },
  "uiMetadata": {
    "tempId": "1768557802049",
    "clientTraceId": "1768557802049-4"
  },
  "success": true
}
```

## Key Data Points Extracted

### From Main Response:
- **Text Content**: Hotel descriptions in markdown format
- **Card Data**: 5 hotel cards with:
  - Hotel IDs
  - Titles
  - Prices (cta_title)
  - Images
  - Ratings (info.text)
  - Links (cta_link)
  - Locations (sub_title)

### From Follow-up Response:
- **Leading Question**: "Based on the options shown, do any of these hotels look like a good fit for your stay in Jaipur?"
- **Suggestions**: Array of suggested follow-up queries
- **SuggestionsNew**: Array of suggestion objects with text

## Content Types Received:
1. **LOADER_TEXT** - Loading messages (skipped, not sent to WhatsApp)
2. **TEXT** - Main text response with hotel descriptions
3. **CARD** - Hotel cards with detailed information
4. **leadingQuestion** - Follow-up question in the data object
