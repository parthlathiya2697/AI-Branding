    - name: Deploy to EC2
    run: |
        ssh -o StrictHostKeyChecking=no ubuntu@${{ secrets.EC2_PUBLIC_IP }} << 'EOF'
        cd AI-Branding
        git pull origin production
        npm install
        npm run build
        # Use pm2 to manage the application
        # Check if the app is running and stop it if it is
        if pm2 list | grep -q "aibranding"; then
        pm2 stop aibranding
        fi
        pm2 start npm --name "aibranding" -- run start -- -H 0.0.0.0 -p 7000
        pm2 save  # Save the process list
        EOF