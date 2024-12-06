const {buildSchema}=require("graphql")


const schema=buildSchema (`
input UserInput{
    name:String
    username:String
    password:String
}

input LoginInput{
    
    username: String
    password: String
}

type AuthData{
    id:ID
    token: String
    name: String
    tokenExpiration:Int
    role:String
}

type User{
    _id:ID
    name:String
    username:String
    password:String
    role:String
}

input QuestionInput {
    name:String
    question:String
}

input AnswerInput {
    question:ID
    user:ID
    answer:String
}

type Answer {
    question:Question
    _id:ID
    user:User
    answer:String
    answerDate:String
}

type Question {
    _id:ID
    name:String
    questionDate:String
    question:String
    answers:[Answer]
    
}

input PatientInput {
    name:String
    city:String
    address:String
    phone:String
    email:String
    password:String
    
}

input LoginPatientInput {
    email:String
    password:String
}

input UpdatePatientInput {
    id:ID
    newname:String
    newcity:String
    newaddress:String
    newphone:String
    newemail:String
  
}

type Patient {
    _id:ID
    name:String
    city:String
    address:String
    phone:String
    email:String
    password:String
    carton:Carton
}

type Carton {
    _id:ID
    patient:String
    teeth:[String]
}

input UpdateInterventionInput {
    id:ID
    date:String
    description:String
}


type Intervention {
    _id:ID
    date:String
    description:String
    patient:Patient
}

input MessageInput {
    user:ID
    patient:ID
    message:String
    sender:String
    read:Boolean
}
type Message {
    _id:ID
    user:User
    patient:Patient
    message:String
    sender:String
    date:String
    read:Boolean
}

input ScheduleInput {
    user:ID
    patient:ID
    date:String,
    time:Int
}


type Schedule {
    _id:ID
    user:User
    patient:Patient
    date:String,
    time:Int
}




type Query {
    users:[User]
    ordinaryUsers:[User]
    findUser(id:ID):User
    
    questions:[Question]

    patients:[ Patient]
    findPatient(id:ID):Patient
    findPatients(name:String):[ Patient ]

    interventions(id:ID):[Intervention]
    interv:[Intervention]

    messages(user:ID,patient:ID):[Message]
    findUnreadMessagesByUser(id:ID):Int
    findUnreadMessagesByUserAndPatient(user:ID, patient:ID):Int

    schedules(user:ID):[Schedule]
    schedulesByDate(user:ID,date:String):[Schedule]
    requestsByUser(id:ID):[Schedule]
}
type Mutation{
    register(userInput:UserInput):User
    deleteUser(id:ID):User
    login(loginInput:LoginInput):AuthData
    updateUser(id:ID,name:String,username:String):User
    changePassword(id:ID,password:String,newPassword:String,confirmation:String):User

	
    createQuestion(questionInput:QuestionInput):Question
    deleteQuestion(id:ID):Question

    createAnswer(answerInput:AnswerInput):Answer
    updateAnswer(id:ID, answer:String):Answer
    deleteAnswer(id:ID):Answer

    registerPatient(patientInput:PatientInput):Patient
    deletePatient(id:ID):Patient
    loginPatient(loginPatientInput:LoginPatientInput):AuthData
    changePatientPassword(id:ID,password:String,newPassword:String,confirmation:String):Patient
    updatePatient(updatePatientInput:UpdatePatientInput):Patient
    patients:[Patient]

    createCarton (id:ID):Carton
    setCarton(id:ID,number:Int,value:String):Carton

    createIntervention(date:String, description:String, patient:ID):Intervention
    deleteIntervention(id:ID):Intervention
    updateIntervention(updateInterventionInput:UpdateInterventionInput):Intervention

    createMessage(messageInput:MessageInput):Message
    deleteMessage(id:ID):Message
    updateMessages(user:ID, patient:ID):[Message]

    createSchedule(scheduleInput:ScheduleInput):Schedule
    requestSchedule(scheduleInput:ScheduleInput):Schedule
    deleteRequestSchedule(id:ID):Schedule
    deleteScheduleById(id:ID):Schedule

}

`)


module.exports=schema