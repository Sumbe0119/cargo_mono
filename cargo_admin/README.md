# cargo_admin

## devloper
```
node version 18 / 22
```

### Deploy
<!-- Ajil ubuntu -->
```
rsync -avz -e 'ssh -i "/home/cisco/Downloads/cisco.pem"' --delete ./dist/ ubuntu@103.50.205.72:/home/ubuntu/repo/cargo/cargo_admin
```
