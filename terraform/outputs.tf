output "instance_ip" {
  value = aws_instance.api_server.public_ip
}
