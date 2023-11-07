# Prodo - Student Productivity App

### https://prodo-mauve.vercel.app/

Welcome to Prodo, your go-to student productivity app! Prodo is designed to help students stay organized, focused, and productive. Whether you need to manage your schedule, take notes, use a Pomodoro timer, or organize tasks using Kanban boards, Prodo has you covered.

## Features

### 1. Scheduler Calendar
- Prodo's scheduler calendar helps you manage your time effectively. You can add, edit, and delete events, set reminders, and organize your daily, weekly, and monthly tasks.

### 2. Notes
- Take and organize notes for your classes, projects, or personal use. Prodo's notes feature allows you to create, edit, and categorize your notes for easy access.

### 3. Pomodoro Timer
- Boost your productivity with the Pomodoro timer. This technique breaks your work into intervals with short breaks, helping you stay focused and efficient.

### 4. Kanban
- The Kanban feature allows you to manage your tasks using boards. Move tasks through stages (e.g., to-do, in progress, completed) for effective task management.

## Getting Started

### Prerequisites
- Web browser
- Internet connection

### Usage
1. Visit the Prodo app at [your-app-url-here].
2. Sign up or log in to access your personalized dashboard.
3. Explore and utilize the features as needed:
   - Scheduler Calendar: Add and manage your events.
   - Notes: Create and organize your notes.
   - Pomodoro Timer: Enhance your focus and time management.
   - Kanban: Organize and track tasks using boards.

## Technologies Used

- HTML
- CSS
- JavaScript
- jQuery
- Bootstrap
- Firebase (for database and authentication)

## Contributing

We welcome contributions from the community! If you'd like to contribute to Prodo, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Test thoroughly.
5. Create a pull request to the `main` branch.


## Acknowledgments

We would like to thank the open-source community, project contributors, and the developers who inspired Prodo.

Enjoy using Prodo and stay productive!


## DEVOPS PRAC 

### docker code 

1.	Clone the repository using the following command:

git clone https://github.com/docker/getting-started-app.git

```

# syntax=docker/dockerfile:1

FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn install --production

CMD ["node", "src/index.js"]

EXPOSE 3000

```


cd /path/to/getting-started-app

Build the image:

docker build -t getting-started .

docker run -dp 127.0.0.1:3000:3000 getting-started




### Docker command 

docker pull redis

docker build -t <image_name> [source_path] [host_path]

docker start <image_name>

docker run <image_name>

docker stop

docker ps

docker images

docker push <image_name>






### jenkins pipeline 

```
pipeline { 
    agent any 
    stages { 
        stage ('Build') {
            steps { 
                echo 'Running build phase...'

            }
        }
        stage('Test'){
            steps{
                echo "Testing the project.."
            }
        }
        stage('Deploy'){
            steps{
                echo "Deploying..."
            }
        }

    }
}
```

### git 

git init 
git config --global user.name 'username'
git config --global user.email 'email' 
git add remote origin <repo_link>
git branch -M main
git add <file>
git commit -M 'message'
git push 




