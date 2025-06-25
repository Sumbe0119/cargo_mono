# cargo_front

## devloper
```
node version 18
```

### Deploy
<!-- Ajil ubuntu -->
```
rsync -avz -e 'ssh -i "/home/cisco/Downloads/cisco.pem"' --delete ./build/ ubuntu@103.50.205.72:/home/ubuntu/repo/cargo/cargo_front
```