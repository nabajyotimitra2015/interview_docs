// 1. Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]


// Build the image:
docker build -t my-node-api:1.0 .

// Then push the image to ECR:

// 2. Kubernetes Deployment YAML

apiVersion: apps/v1
kind: Deployment

metadata:
  name: node-api

spec:
  replicas: 3

  selector:
    matchLabels:
      app: node-api

  template:
    metadata:
      labels:
        app: node-api

    spec:
      containers:
        - name: node-api

          image: <AWS_ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/my-node-api:1.0

          ports:
            - containerPort: 3000

          resources:
            requests:
              cpu: "250m"
              memory: "256Mi"

            limits:
              cpu: "500m"
              memory: "512Mi"

// 3. Kubernetes Service

apiVersion: v1
kind: Service

metadata:
  name: node-api-service

spec:
  selector:
    app: node-api

  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000

  type: LoadBalancer


// 4. HPA — automatic scaling

apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler

metadata:
  name: node-api-hpa

spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: node-api

  minReplicas: 3
  maxReplicas: 10

  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70

// 5. Apply everything

Once your EKS cluster is ready:

kubectl apply -f deployment.yml

kubectl apply -f service.yml

kubectl apply -f hpa.yml

// Or put all three YAML files together and run:

kubectl apply -f k8s/

// Check your Pods:

kubectl get pods