/*
export GOOGLE_APPLICATION_CREDENTIALS=/Users/puttitang/Downloads/putti-ktb-inno-bootcamp-26fd79cc01fa.json
export GOOGLE_CLOUD_PROJECT=putti-ktb-inno-bootcamp
export CLOUDSDK_CORE_PROJECT=putti-ktb-inno-bootcamp
*/

// Copyright 2019-2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * This sample demonstrates how to perform basic operations on topics with
 * the Google Cloud Pub/Sub API.
 *
 * For more information, see the README.md under /pubsub and the documentation
 * at https://cloud.google.com/pubsub/docs.
 */

'use strict';

// sample-metadata:
//   title: Publish Message
//   description: Publishes a message to a topic.
//   usage: node publishMessage.js <topic-name> <data>

const uuid = require('uuid');


function sleep(mil) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, mil);
    });
  }

async function main(
  topicName = 'projects/putti-ktb-inno-bootcamp/topics/inno-bootcamp-topic-1',
  data = JSON.stringify({foo: uuid.v4()})
) {
  // [START pubsub_publish_with_error_handler]
  // [START pubsub_quickstart_publisher]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const topicName = 'YOUR_TOPIC_NAME';
  // const data = JSON.stringify({foo: 'bar'});

  // Imports the Google Cloud client library
  const {PubSub} = require('@google-cloud/pubsub');

  // Creates a client; cache this for further use
  const pubSubClient = new PubSub();

  async function publishMessage() {
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    data = JSON.stringify({foo: uuid.v4()})
    const dataBuffer = Buffer.from(data);

    try {
      const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
      console.log(`Message ${messageId} published.`);
    } catch (error) {
      console.error(`Received error while publishing: ${error.message}`);
      process.exitCode = 1;
    }
  }

  console.log("sleeping for 5 sec");
  await sleep(5000);
  console.log('wake up');

  /*
  var i;
  for (i = 0; i < 9; i++) {
    await publishMessage();
  }  
  */

  while (true) {
    await publishMessage();
  }

  // [END pubsub_publish_with_error_handler]
  // [END pubsub_quickstart_publisher]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

main(...process.argv.slice(2));