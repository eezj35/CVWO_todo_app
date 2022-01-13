package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Todo struct {
	Id          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Task        string             `json:"task,omitempty"`
	IsCompleted bool               `json:"iscompleted,omitempty"`
}
