pipeline {
    agent any

    stages {
        stage('Podman Login') {
            steps {
                script {
                    // Use the credentials stored in Jenkins
                    withCredentials([usernamePassword(credentialsId: 'jfrog-non-admin-creds', usernameVariable: 'REGISTRY_USER', passwordVariable: 'REGISTRY_PASS')]) {
                        withEnv(["REGISTRY_USER=$REGISTRY_USER", "REGISTRY_PASS=$REGISTRY_PASS"]) {
                            sh """
                            echo \$REGISTRY_PASS | podman login --username \$REGISTRY_USER --password-stdin my-registry.example.com
                            """
                        }
                    }
                }
            }
        }

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