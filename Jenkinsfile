pipeline {
    agent any

    stages {
        stage('NPM Config') {
            steps {
                script {
                    sh '''
                        cd react-app
                        npm -v
                        npm install
                    '''
                }
            }
        }

        stage('Podman Build') {
            steps {
                script {
                    sh '''
                        podman build --no-cache -t programmerq .
                    '''
                }
            }
        }
    }

    post {
        // Clean after build
        always {
            cleanWs()
        }
    }
}