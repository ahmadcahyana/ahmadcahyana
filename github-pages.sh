#!/bin/bash

# GitHub Pages Setup Script for Ahmad Cahyana Portfolio

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in a git repository
check_git() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "This is not a git repository. Please run 'git init' first."
        exit 1
    fi
}

# Check if Node.js and npm are installed
check_node() {
    if ! command -v node > /dev/null 2>&1; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command -v npm > /dev/null 2>&1; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
}

# Test the GitHub Pages build locally
test_build() {
    print_info "Testing GitHub Pages build locally..."
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        print_info "Installing dependencies..."
        npm ci
    fi
    
    # Run the GitHub Pages build
    print_info "Building for GitHub Pages..."
    if npm run build:github; then
        print_success "Build completed successfully!"
        
        # Check if out directory exists
        if [ -d "out" ]; then
            print_success "Static export created in 'out' directory"
            
            # Show some stats
            OUT_SIZE=$(du -sh out | cut -f1)
            FILE_COUNT=$(find out -type f | wc -l)
            print_info "Export size: $OUT_SIZE"
            print_info "Total files: $FILE_COUNT"
            
            # Optional: serve locally for testing
            read -p "Would you like to serve the site locally for testing? (y/N): " serve_local
            if [[ $serve_local =~ ^[Yy]$ ]]; then
                print_info "Starting local server..."
                print_info "Open http://localhost:3000 in your browser"
                print_warning "Press Ctrl+C to stop the server"
                npx serve out -p 3000
            fi
        else
            print_error "Build completed but 'out' directory not found"
            exit 1
        fi
    else
        print_error "Build failed! Please check the errors above."
        exit 1
    fi
}

# Setup GitHub repository for Pages
setup_github() {
    print_info "Setting up GitHub repository for Pages deployment..."
    
    # Check if we have a remote origin
    if ! git remote get-url origin > /dev/null 2>&1; then
        print_error "No GitHub remote found. Please add your GitHub repository as origin:"
        print_info "git remote add origin https://github.com/USERNAME/REPOSITORY.git"
        exit 1
    fi
    
    REMOTE_URL=$(git remote get-url origin)
    print_info "GitHub repository: $REMOTE_URL"
    
    # Extract repository name from URL
    REPO_NAME=$(basename "$REMOTE_URL" .git)
    print_info "Repository name: $REPO_NAME"
    
    # Check if we're on the main branch
    CURRENT_BRANCH=$(git branch --show-current)
    if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
        print_warning "You're not on the main/master branch (current: $CURRENT_BRANCH)"
        print_warning "GitHub Pages workflow is configured to run on 'main' branch"
        read -p "Do you want to continue? (y/N): " continue_setup
        if [[ ! $continue_setup =~ ^[Yy]$ ]]; then
            print_info "Setup cancelled. Switch to main branch and try again."
            exit 0
        fi
    fi
}

# Deploy to GitHub Pages
deploy() {
    print_info "Deploying to GitHub Pages..."
    
    # Check if there are uncommitted changes
    if ! git diff-index --quiet HEAD --; then
        print_warning "You have uncommitted changes. Committing them now..."
        git add .
        git commit -m "Setup GitHub Pages deployment"
    fi
    
    # Push to GitHub
    print_info "Pushing to GitHub..."
    git push origin HEAD
    
    print_success "Code pushed to GitHub!"
    print_info "GitHub Actions will now build and deploy your site."
    
    # Try to get the repository URL for quick access
    REMOTE_URL=$(git remote get-url origin)
    if [[ $REMOTE_URL == *"github.com"* ]]; then
        # Extract username and repo name
        REPO_PATH=$(echo "$REMOTE_URL" | sed 's/.*github\.com[/:]\(.*\)\.git.*/\1/' | sed 's/.*github\.com[/:]\(.*\)/\1/')
        ACTIONS_URL="https://github.com/$REPO_PATH/actions"
        PAGES_URL="https://$(echo "$REPO_PATH" | cut -d'/' -f1).github.io/$(echo "$REPO_PATH" | cut -d'/' -f2)/"
        
        print_info "Monitor deployment: $ACTIONS_URL"
        print_info "Your site will be available at: $PAGES_URL"
        
        # Open URLs if possible
        if command -v xdg-open > /dev/null 2>&1; then
            read -p "Open GitHub Actions in browser? (y/N): " open_actions
            if [[ $open_actions =~ ^[Yy]$ ]]; then
                xdg-open "$ACTIONS_URL"
            fi
        elif command -v open > /dev/null 2>&1; then
            read -p "Open GitHub Actions in browser? (y/N): " open_actions
            if [[ $open_actions =~ ^[Yy]$ ]]; then
                open "$ACTIONS_URL"
            fi
        fi
    fi
}

# Clean up build artifacts
clean() {
    print_info "Cleaning up build artifacts..."
    
    if [ -d "out" ]; then
        rm -rf out
        print_success "Removed 'out' directory"
    fi
    
    if [ -d ".next" ]; then
        rm -rf .next
        print_success "Removed '.next' directory"
    fi
    
    print_success "Cleanup completed!"
}

# Show help
show_help() {
    echo "GitHub Pages Setup Script for Ahmad Cahyana Portfolio"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  test          Test the GitHub Pages build locally"
    echo "  setup         Setup GitHub repository for Pages deployment"
    echo "  deploy        Deploy to GitHub Pages"
    echo "  clean         Clean up build artifacts"
    echo "  full          Run full setup (test + setup + deploy)"
    echo "  help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 test       # Test build locally"
    echo "  $0 full       # Complete setup and deployment"
    echo "  $0 deploy     # Just deploy (if already set up)"
    echo ""
    echo "Manual Steps Required:"
    echo "1. Enable GitHub Pages in repository settings"
    echo "2. Set Source to 'GitHub Actions'"
    echo "3. Run this script with 'full' command"
}

# Full setup process
full_setup() {
    print_info "Starting full GitHub Pages setup..."
    
    check_git
    check_node
    setup_github
    test_build
    
    print_warning ""
    print_warning "IMPORTANT: Before deploying, make sure you've enabled GitHub Pages:"
    print_warning "1. Go to your repository on GitHub"
    print_warning "2. Settings → Pages"
    print_warning "3. Source: GitHub Actions"
    print_warning ""
    
    read -p "Have you enabled GitHub Pages in repository settings? (y/N): " pages_enabled
    if [[ $pages_enabled =~ ^[Yy]$ ]]; then
        deploy
    else
        print_info "Please enable GitHub Pages first, then run: $0 deploy"
    fi
}

# Main script logic
case "${1:-help}" in
    "test")
        check_node
        test_build
        ;;
    "setup")
        check_git
        setup_github
        ;;
    "deploy")
        check_git
        deploy
        ;;
    "clean")
        clean
        ;;
    "full")
        full_setup
        ;;
    "help"|"--help"|"-h")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac
