import { gql } from 'apollo-boost'

export const CREATE_QUESTION=gql` 
mutation CreateQuestion($questionInput:QuestionInput){
createQuestion( questionInput:$questionInput){ 
    _id
    name
    questionDate
}
}
`
export const DELETE_QUESTION=gql `
mutation DeleteQuestion($id:ID){
    deleteQuestion(id:$id){
        _id
    }
}
`