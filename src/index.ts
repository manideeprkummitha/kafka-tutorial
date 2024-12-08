import { Kafka } from "kafkajs";

// creating a instance of kafka
const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"]
})

//creating a producer
const producer = kafka.producer();

//creating a consumer
const consumer = kafka.consumer({
    groupId:"my-app3"
});


// starting the producer and consumer
async function main(){
    await producer.connect();
    // here quickstart is some random topic we have used
    await producer.send({
        topic:"quickstart-events",
        messages:[{
            value:"hello world"
        }]
    });

    await consumer.connect();

    await consumer.subscribe({
        topic:"quickstart-events",
        fromBeginning: true
    })

    await consumer.run({
        eachMessage:async({topic,partition,message})=>{
            console.log({
                offset: message.offset,
                value: message?.value?.toString(),
            })
        }
    })
}

main();