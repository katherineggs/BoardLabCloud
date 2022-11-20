# BoardLabCloud
BoardLab app for Cloud Course :)

Different ways of running our app
1. [AWS EKS Cluster Application Deploy](https://github.com/katherineggs/BoardLabCloud#aws-eks-cluster-application-deploy)
2. [Pull our images from Dockerhub and deploy docker-compose](https://github.com/katherineggs/BoardLabCloud#pull-our-images-from-dockerhub-and-deploy-docker-compose)
3. [Build our project with our dockerfile & docker-compose](https://github.com/katherineggs/BoardLabCloud#build-our-project-with-our-dockerfile--docker-compose)
---
## AWS EKS Cluster Application Deploy

Code needed to create an EKS Cluster from scratch using terraform. You will also find the hacks and step-by-step instructions so you can create your first cluster and deploy a web-accessible application.

### Prerequisites

-  Install AWS CLI and authenticate at the command line with your AWS account.
  - [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
  - [Authenticate with AWS CLI](https://docs.aws.amazon.com/es_es/cli/latest/userguide/cli-configure-quickstart.html)
- [Install Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
- [Install Kubectl](https://kubernetes.io/es/docs/tasks/tools/included/)

### AWS EKS Cluster

#### Create EKS Cluster

```sh
terraform init
```

The terraform module [EKS Cluster](terraform-aws/aws-eks-modules/eks-cluster) creates all networking components required to create an EKS Cluster.

Folder "terraform-aws"
```sh
terraform apply --target module.eks-cluster
```

#### Update the context of K8s

Update the Kubernetes context to connect and authenticate kubectl with the created cluster.

```sh
aws eks update-kubeconfig --name eks-cluster-cloud --region us-east-1
```

#### Create Fargate profiles

The EKS Cluster will use forgate profiles to avoid node management, the fargate profiles are related to the K8s namespaces to contain the resources to be created.

Folder "terraform-aws"
```sh
terraform apply --target module.eks-fargate
```

#### Create K8s namespace

The first K8s resource to create is a namespace. In the previous step a Fargate profile was created with the name development, so, the namespace will be called the same, if you decide to use another name for the Fargate profile you must change the name of the namespace in the manifest [namespace.yml](k8s-manifests/0-namespace.yml).

Folder "k8s-manifests"
```sh
kubectl apply -f 0-namespace.yml
```

#### Create Loadbalancer Controller

To expose applications outside the EKS Cluster it uses AWS networking resources, mainly Loadbalancers, for the implementation to work it is necessary to install a controller on the EKS Cluster.

Folder "terraform-aws"
```sh
terraform apply --target module.loadbalancer-controller
```

#### Deploy application

The application to be deployed has the following components:

- Database
- Backend
- Frontend
Each component will be deployed separately and in order of dependency.

Folder "k8s-manifests"
Deploy Database
```sh
kubectl apply -f 1-mongodb.yml
```

Folder "k8s-manifests"
Deploy Backend
```sh
kubectl apply -f 2-backend.yml
```

Folder "k8s-manifests"
Deploy Frontend
```sh
kubectl apply -f 3-frontend.yml
```
---

### Eliminate all resources

When you finish your tests it is important that you destroy all resources to avoid incurring any costs.

- Eliminate all K8 services

```sh
# Obtain the name of the services
$ kubectl get services -n development
# Remove all services
$ kubectl delete service SERVICE_NAME -n development
```

- Remove all resources from AWS

````sh
# Remove the loadbalancer controller 
$ terraform destroy --target module.loadbalancer-controller
# Remove Fargate profiles
$ terraform destroy --target module.eks-fargate
# Remove EKS Cluster and all Network resources
$ terraform destroy --target module.eks-cluster
````

---
## Pull our images from Dockerhub and deploy docker-compose
Access to ``` images``` 
- ```docker-compose up```

An then access to 
- ```localhost:3000```

---
## Build our project with our dockerfile & docker-compose
Run it with 
- ```docker-compose build```
- ```docker-compose up```

An then access to 
- ```localhost:3000```
