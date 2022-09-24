const swaggerPaths = include('swagger/swaggerPaths');

swaggerPaths.addPath('/fitbit/calories', {
  get: {
    tags: ['fitbit'],
    summary: 'Get user calories',
    parameters: [{
      name: 'startDate',
      in: 'query',
    }, {
      name: 'endDate',
      in: 'query',
    }],
    responses: {
      200: {
        description: swaggerPaths.httpStatus(200, 'The calories'),
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              dateTime: {
                type: 'string',
                example: '2017-11-19',
              },
              value: {
                type: 'string',
                example: '2525',
              },
            },
          },
        },
      },
    },
  },
}, {
  protected: true,
});

// curl 'http://localhost:3000/api/fitbit/calories?startDate=2017-11-01&endDate=2017-11-20' -H 'If-None-Match: W/"2a-sI/Rjqu/1zBp4oe/RgiWTEJyLCE"' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-US,en;q=0.9' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36' -H 'Accept: application/json, text/plain, */*' -H 'Referer: http://localhost:3000/' -H 'Cookie: picreel_tracker__first_visit=Mon%20Oct%2016%202017%2015%3A18%3A37%20GMT-0400%20(EDT); io=_WEH4Od-od5QVpbWAAAH; picreel_tracker__page_views=178; _vwo_uuid_v2=C18AACF22F2CC92A5EF9DA6F121D9F31|7e3173675ab2d2c0c935219a7142ffa2; _ga=GA1.1.7846721.1479261827; _gid=GA1.1.1140689508.1511189632; driftt_aid=acceabc0-77d6-4bf4-a862-0c8df3fa560d; DFTT_END_USER_PREV_BOOTSTRAPPED=true; token=Bearer%20eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpZGV2LnRlc3Rmb3J3YXJkLmNvbS9hdXRoZW50aWNhdGUiLCJpYXQiOjE1MTEzMDAxNjcsImV4cCI6MTUxMjUwOTc2NywibmJmIjoxNTExMzAwMTY3LCJqdGkiOiIxQmtHUHZDV3JGR3czS3Z2Iiwic3ViIjoiNWZhNjA0MGQtNzQzYy00ZjhhLWFlYzYtM2E3N2U5NWVkM2VjIiwidXNlciI6eyJpZCI6ODUsInV1aWQiOiI1ZmE2MDQwZC03NDNjLTRmOGEtYWVjNi0zYTc3ZTk1ZWQzZWMifX0.NvDp7Ai6rwaZjtdH40vsPX7G4_EyoD0wit_6qTkxK3o; uuid=5fa6040d-743c-4f8a-aec6-3a77e95ed3ec' -H 'Connection: keep-alive' -H 'token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6M30.hzfEQOcJdvat6x_di6IDwi_tykCfKIAeehBukstyS14' --compressed
