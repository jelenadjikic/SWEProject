const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const graphqlHTTP=require("express-graphql") //middleware
const isAuth=require("./middlewares/is-auth")

const schema=require("./schema")

const userResolver=require("./resolvers/userResolver")
const questionResolver=require('./resolvers/QuestionResolver')
const answerResolver=require('./resolvers/AnswerResolver')
const patientResolver=require('./resolvers/patientResolver')
const cartonResolver=require('./resolvers/cartonResolver')
const interventionResolver=require('./resolvers/interventionResolver')
const messageResolver=require('./resolvers/messageResolver')
const scheduleResolver=require('./resolvers/ScheduleResolver')

const root={...userResolver,...questionResolver, ...answerResolver, ...patientResolver, ...cartonResolver, ... interventionResolver, ...messageResolver, ...scheduleResolver}

const app=express()
app.use(cors())
app.use("/",isAuth)

app.use("/graphql",graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

const PORT=process.env.PORT || 4000

mongoose.connect("mongodb+srv://jelenadjikic:jatdentist@cluster0-5yw0g.mongodb.net/<dbname>?retryWrites=true&w=majority", { useNewUrlParser:true, useUnifiedTopology:true})
        .then(()=>console.log("Conncected to the MongoDB"))
        .catch(err=>console.log(err))

app.listen(PORT,()=>console.log(`Server is listening on port ${PORT}`))