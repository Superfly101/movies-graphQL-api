import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieInput } from './dto/create-movie.dto';
import { UpdateMovieInput } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOneBy({ id });

    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie;
  }

  async create(createMovieInput: CreateMovieInput): Promise<Movie> {
    const movie = this.moviesRepository.create(createMovieInput);
    return this.moviesRepository.save(movie);
  }

  async update(updateMovieInput: UpdateMovieInput): Promise<Movie> {
    const movie = await this.moviesRepository.findOneBy({
      id: updateMovieInput.id,
    });
    if (!movie) {
      throw new Error('Movie not found');
    }

    // Update the fields only if they are provided
    if (updateMovieInput.title) movie.title = updateMovieInput.title;
    if (updateMovieInput.description)
      movie.description = updateMovieInput.description;
    if (updateMovieInput.year) movie.year = updateMovieInput.year;
    if (updateMovieInput.rating !== undefined)
      movie.rating = updateMovieInput.rating;

    return this.moviesRepository.save(movie); // Save updated movie
  }

  async remove(id: number) {
    const movie = await this.moviesRepository.findOneBy({ id });

    if (!movie) {
      throw new Error('Movie not found');
    }

    await this.moviesRepository.delete(id);
    return movie;
  }
}
