# Docker Setup for Ahmad Cahyana Portfolio

This project includes comprehensive Docker configuration for both development and production environments.

## Quick Start

### Development Environment

```bash
# Start development environment (with hot reloading)
docker-compose up

# Or explicitly use the development file
docker-compose -f docker-compose.dev.yml up

# Build and run in detached mode
docker-compose -f docker-compose.dev.yml up -d --build
```

### Production Environment

```bash
# First, create production environment file
cp .env.production.example .env.production
# Edit .env.production with your production values

# Start production environment
docker-compose -f docker-compose.prod.yml up -d --build
```

## File Structure

```
├── Dockerfile                    # Multi-stage Docker build
├── docker-compose.yml           # Default (development) compose
├── docker-compose.dev.yml       # Development environment
├── docker-compose.prod.yml      # Production environment
├── nginx.conf                   # Nginx configuration for production
├── .dockerignore                # Files to exclude from Docker build
├── .env.production.example      # Production environment template
└── README-docker.md            # This file
```

## Docker Stages

### Development Stage
- **Target**: `dev`
- **Port**: 9002
- **Features**:
  - Hot reloading enabled
  - Source code mounted as volumes
  - Full development dependencies
  - Direct npm run dev

### Production Stage
- **Target**: `runner`
- **Port**: 3000
- **Features**:
  - Optimized standalone build
  - Minimal runtime dependencies
  - Nginx reverse proxy
  - Security headers
  - Gzip compression
  - Health checks

## Available Commands

### Development
```bash
# Start development environment
docker-compose up

# Rebuild containers
docker-compose up --build

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Remove volumes (clean slate)
docker-compose down -v
```

### Production
```bash
# Start production environment
docker-compose -f docker-compose.prod.yml up -d

# View production logs
docker-compose -f docker-compose.prod.yml logs -f

# Scale the application (if needed)
docker-compose -f docker-compose.prod.yml up -d --scale nextjs-prod=3

# Stop production environment
docker-compose -f docker-compose.prod.yml down
```

### Individual Services
```bash
# Build only the Next.js app
docker build --target dev -t ahmadcahyana:dev .
docker build --target runner -t ahmadcahyana:prod .

# Run individual containers
docker run -p 9002:9002 -v $(pwd):/app ahmadcahyana:dev
docker run -p 3000:3000 ahmadcahyana:prod
```

## Environment Variables

### Development (.env)
```env
GEMINI_API_KEY=your_development_key
NODE_ENV=development
```

### Production (.env.production)
```env
GEMINI_API_KEY=your_production_key
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## Production Features

### Nginx Reverse Proxy
- **Load balancing**: Distributes requests across app instances
- **Static file serving**: Efficient serving of static assets
- **Gzip compression**: Reduces bandwidth usage
- **Security headers**: Adds security-focused HTTP headers
- **Rate limiting**: Protects against API abuse
- **Health checks**: Monitors application health

### SSL/HTTPS Setup (Optional)
Uncomment the SSL server block in `nginx.conf` and:
1. Place your SSL certificates in `./ssl/` directory
2. Update the server_name to your domain
3. Restart the nginx container

## Troubleshooting

### Common Issues

1. **Port conflicts**:
   ```bash
   # Check what's using the port
   lsof -i :9002
   # Change port in docker-compose files
   ```

2. **Permission issues**:
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

3. **Build failures**:
   ```bash
   # Clear Docker cache
   docker system prune -a
   # Rebuild without cache
   docker-compose build --no-cache
   ```

4. **Hot reloading not working**:
   - Ensure `WATCHPACK_POLLING=true` is set
   - Check volume mounts in docker-compose.dev.yml

### Debugging

```bash
# Access container shell
docker-compose exec nextjs-dev sh

# View container logs
docker-compose logs nextjs-dev

# Inspect container
docker inspect ahmadcahyana-dev
```

## Performance Optimization

### Production Optimizations
- Multi-stage builds reduce image size
- Standalone output minimizes runtime dependencies
- Nginx handles static files efficiently
- Non-root user improves security
- Health checks ensure reliability

### Development Optimizations
- Volume mounts enable hot reloading
- Node modules cached in anonymous volume
- Development dependencies included
- Debug-friendly configuration

## Monitoring

### Health Checks
The production setup includes health checks:
- **Application**: `http://localhost:3000/api/health`
- **Nginx**: `http://localhost/health`

### Logs
```bash
# Application logs
docker-compose -f docker-compose.prod.yml logs nextjs-prod

# Nginx logs
docker-compose -f docker-compose.prod.yml logs nginx

# All services
docker-compose -f docker-compose.prod.yml logs
```