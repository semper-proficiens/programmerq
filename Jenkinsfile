pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    sh '''
                        cd react-app
                        pwd
                        ls -lahs
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