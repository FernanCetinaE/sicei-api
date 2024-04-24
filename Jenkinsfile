pipeline {
    agent any
    
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                script {
                    def testContainer = docker.build("test-image")
                    testContainer.inside {
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def gitBranchName = env.GIT_BRANCH.split('/').last()
                    sh "/usr/local/bin/docker build -t sicei-s${gitBranchName}:1.0.0-${env.BUILD_NUMBER} ."
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker run -d -p 3005:3005 my-express-app'
            }
        }
    }
}