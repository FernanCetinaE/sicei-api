pipeline {
    agent any
    tools {nodejs "Node 21.7.1"}
    stages {
        stage('Build'){
            steps{
                sh 'npm i'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def gitBranchName = env.GIT_BRANCH.split('/').last()
                    sh "/usr/local/bin/docker build -t sicei-${gitBranchName}:1.1.0-${env.BUILD_NUMBER} ."
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def gitBranchName = env.GIT_BRANCH.split('/').last()
                    sh "/usr/local/bin/docker run -d -p 3005:3005 sicei-${gitBranchName}:1.1.0-${env.BUILD_NUMBER}"
                }
            }
        }
    }
}