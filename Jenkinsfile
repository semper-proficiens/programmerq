pipeline {
    agent any

    stages {
        stage('NPM Config') {
            steps {
                script {
                    sh '''
                        cd react-app
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
                        nvm install 18
                        nvm use 18
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