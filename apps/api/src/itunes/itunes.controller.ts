import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { SearchResponseDto } from './dto/itunes.dto';
import { iTunesService } from './itunes.service';

@Controller()
export class iTunesController {
  private readonly logger = new Logger(iTunesController.name);

  constructor(private readonly itunesService: iTunesService) {}

  @Get('search')
  async search(
    @Query('term') term: string,
    @Query('limit') limit?: number
  ): Promise<SearchResponseDto> {
    try {
      if (!term) {
        throw new HttpException(
          'Search term is required',
          HttpStatus.BAD_REQUEST
        );
      }

      if (term.trim().length === 0) {
        throw new HttpException(
          'Search term cannot be empty',
          HttpStatus.BAD_REQUEST
        );
      }

      if (term.length > 100) {
        throw new HttpException(
          'Search term too long (max 100 characters)',
          HttpStatus.BAD_REQUEST
        );
      }

      // Validate limit parameter
      let validatedLimit = 50;
      if (limit !== undefined) {
        if (isNaN(limit) || limit < 1 || limit > 200) {
          throw new HttpException(
            'Limit must be a number between 1 and 200',
            HttpStatus.BAD_REQUEST
          );
        }
        validatedLimit = limit;
      }

      this.logger.log(`Searching for: ${term} with limit: ${validatedLimit}`);

      // Use the new cache-first search method
      const result = await this.itunesService.searchWithCache(
        term,
        validatedLimit
      );

      return {
        searchTerm: term,
        resultCount: result.results.length,
        results: result.results,
      };
    } catch (error) {
      this.logger.error(`Search error: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
