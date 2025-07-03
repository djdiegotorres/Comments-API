variable "aws_region" {
  default = "us-east-1"
}

variable "instance_type" {
  default = "t2.micro"
}

variable "key_name" {
  description = "devops-test"
}

variable "ami_id" {
  default = "ami-05ffe3c48a9991133"
}
