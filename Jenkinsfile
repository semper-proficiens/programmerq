pipeline {
    agent any

    stages {
        stage('Podman Build') {
            steps {
                script {
                    sh '''
                        cd react-app
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