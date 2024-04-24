pipeline {
    agent any
    
    stages {
        stage('Build'){
            steps{
                sh '/Users/fernancetina/.nvm/versions/node/v16.17.0/bin/npm i'
            }
        }

        stage('Test') {
            steps {
                sh '/Users/fernancetina/.nvm/versions/node/v16.17.0/bin/npm run test'
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