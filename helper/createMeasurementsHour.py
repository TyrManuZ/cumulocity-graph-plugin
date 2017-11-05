import requests, base64, datetime, json, random

tenant = ""
username = ""
password = ""
baseUrl = ""

device = ''

seriesAmount = 50
timestampAmounts = 3600
baseTime = datetime.datetime(2017,9,23,2,0,0)

url = baseUrl + "/measurement/measurements"

headers = {
  'Authorization': 'Basic ' + base64.b64encode(tenant + '/' + username +':'+ password),
  'Content-Type': 'application/json'
}

measurement = {
  'source': { 'id': device},
  'type': 'c8y_ExperimentMeasurements',
  'time': baseTime.strftime("%Y-%m-%dT%H:%M:%SZ")
}

series = []
for i in range(1, timestampAmounts + 1):
  values = []
  for j in range(1,seriesAmount + 1):
    values.append(random.randint(1, 100))
  timeValues = {
    'time': (baseTime + datetime.timedelta(seconds=1 * (i - 1))).strftime("%H:%M:%S"),
    'values': values
  }
  series.append(timeValues)

measurement['c8y_ExperimentMeasurements'] = series
seriesLabels = []

for i in range(1,seriesAmount + 1):
  seriesLabels.append("val" + str(i))

measurement["seriesLabels"] = seriesLabels;

requests.post(url, data=json.dumps(measurement), headers=headers)
