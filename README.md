# Diet Planning Project (name pending)
A diet planning assistant to assist with weight loss, gain, or just maintaining a healthy lifestyle
## Requirements (Running the server)
### Back-end
0. Move into Directory `back-end/`
1. Create folder `data/` in `back-end/app`. Use this command in terminal in directory data/:

- wget https://huggingface.co/datasets/openfoodfacts/product-database/resolve/main/food.parquet

2. Install [Python 3.14](https://www.python.org/downloads/)
3. Create virtual environment `python -m venv .venv` than start venv with `source .venv/bin/activate`
4. Install [required packages](/requirements.txt) with `pip install -r requirements.txt`
5. Run the server with `uv run fastapi dev`
6. Verify the server is running by visiting localhost:8000 or localhost:8000/docs in your browser
7. use `localhost:8000/docs` for swagger
### Front-end
0. Move into Directory `front-end/`
1. To install dependancies, type into terminal `npm install`
2. To run server, type into terminal `npm run dev` for frontend web app

# Docker Setup
## Requirements
- Install Docker Desktop: https://www.docker.com/products/docker-desktop/
## Start the Application
From the project root, run:
`docker-compose up --build`
or
`sudo docker-compose up --build`
