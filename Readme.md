# PodPane

**PodPane** is a lightweight, self-hostable dashboard for managing your Docker containers. It's not intended to replace the command line, just to offer a clean, simple view for basic management tasks like restarting containers, viewing logs and stats.

## 🏠 Self-Hosting

PodPane is designed to be simple to run and host yourself. An example `docker-compose.yml` file is included in the repository.

### 🚀 Quick Start

### 🔧 Example `docker-compose.yml`

```yaml
services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - VITE_API_URL=http://localhost:3000

  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    ports:
      - "3000:3000"
    volumes:
      - ./backend:/app
      - /var/run/docker.sock:/var/run/docker.sock
    depends_on:
      - frontend
```

> 🧠 **Note:** Mounting the Docker socket gives PodPane access to your container runtime. Make sure you trust the code and understand the implications.

---

## 🛠 Development

PodPane consists of:

- **Frontend**: [SolidJS](https://www.solidjs.com/) + Vite
- **Backend**: [Go](https://golang.org/) using the [Fiber](https://gofiber.io/) web framework

### Running Locally

TODO

---

## 🗺️ Roadmap

Here's what's planned for future development:

- [ ] View Docker Compose stacks and config files
- [ ] Improved log viewing with filtering and timestamps
- [ ] Podman support for broader compatibility

---

## 🤝 Contributing

Pull requests, feedback, and ideas are welcome! If you'd like to contribute, please fork the repo and submit a PR.

---

## 📄 License

MIT License. See `LICENSE` file for details.
