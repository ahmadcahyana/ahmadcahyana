#!/bin/bash

# Docker Utility Script for Ahmad Cahyana Portfolio

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

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Development environment
dev() {
    print_info "Starting development environment..."
    check_docker
    docker-compose -f docker-compose.dev.yml up --build
}

# Development environment (detached)
dev_detached() {
    print_info "Starting development environment in detached mode..."
    check_docker
    docker-compose -f docker-compose.dev.yml up -d --build
    print_success "Development environment started!"
    print_info "Access your application at: http://localhost:9002"
}

# Production environment
prod() {
    print_info "Starting production environment..."
    check_docker
    
    # Check if production env file exists
    if [ ! -f ".env.production" ]; then
        print_warning "Production environment file not found."
        print_info "Creating .env.production from template..."
        cp .env.production.example .env.production
        print_warning "Please edit .env.production with your production values before continuing."
        read -p "Press Enter to continue after editing .env.production..."
    fi
    
    docker-compose -f docker-compose.prod.yml up -d --build
    print_success "Production environment started!"
    print_info "Access your application at: http://localhost"
}

# Stop all services
stop() {
    print_info "Stopping all Docker services..."
    docker-compose down 2>/dev/null || true
    docker-compose -f docker-compose.dev.yml down 2>/dev/null || true
    docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
    print_success "All services stopped!"
}

# Clean up everything
clean() {
    print_warning "This will remove all containers, volumes, and images for this project."
    read -p "Are you sure? (y/N): " confirm
    
    if [[ $confirm =~ ^[Yy]$ ]]; then
        print_info "Cleaning up Docker resources..."
        stop
        docker-compose -f docker-compose.dev.yml down -v --rmi all 2>/dev/null || true
        docker-compose -f docker-compose.prod.yml down -v --rmi all 2>/dev/null || true
        docker system prune -f
        print_success "Cleanup completed!"
    else
        print_info "Cleanup cancelled."
    fi
}

# Show logs
logs() {
    if [ "$1" = "prod" ]; then
        docker-compose -f docker-compose.prod.yml logs -f
    else
        docker-compose -f docker-compose.dev.yml logs -f
    fi
}

# Health check
health() {
    print_info "Checking application health..."
    
    # Try development endpoint first
    if curl -s http://localhost:9002/api/health > /dev/null 2>&1; then
        print_success "Development server is healthy!"
        curl -s http://localhost:9002/api/health | jq . 2>/dev/null || curl -s http://localhost:9002/api/health
    elif curl -s http://localhost:3000/api/health > /dev/null 2>&1; then
        print_success "Production server is healthy!"
        curl -s http://localhost:3000/api/health | jq . 2>/dev/null || curl -s http://localhost:3000/api/health
    elif curl -s http://localhost/api/health > /dev/null 2>&1; then
        print_success "Production server (via Nginx) is healthy!"
        curl -s http://localhost/api/health | jq . 2>/dev/null || curl -s http://localhost/api/health
    else
        print_error "No healthy application found!"
        exit 1
    fi
}

# Show help
show_help() {
    echo "Docker Utility Script for Ahmad Cahyana Portfolio"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev           Start development environment (interactive)"
    echo "  dev-d         Start development environment (detached)"
    echo "  prod          Start production environment"
    echo "  stop          Stop all services"
    echo "  clean         Remove all containers, volumes, and images"
    echo "  logs [env]    Show logs (env: dev|prod, default: dev)"
    echo "  health        Check application health"
    echo "  help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 dev        # Start development server"
    echo "  $0 prod       # Start production server"
    echo "  $0 logs prod  # Show production logs"
    echo "  $0 health     # Check if application is healthy"
}

# Main script logic
case "${1:-help}" in
    "dev")
        dev
        ;;
    "dev-d"|"dev-detached")
        dev_detached
        ;;
    "prod"|"production")
        prod
        ;;
    "stop")
        stop
        ;;
    "clean")
        clean
        ;;
    "logs")
        logs "$2"
        ;;
    "health")
        health
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
