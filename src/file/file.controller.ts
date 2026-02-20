import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseFilePipeBuilder,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {
  private tabFile: Record<string, Express.Multer.File | undefined> = {};

  @UseInterceptors(FileInterceptor('file'))
  @Post('file/pass-validation')
  uploadFileAndPassValidation(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    this.tabFile[file?.originalname || 'default'] = file;
    return {
      file: file?.buffer.toString(),
    };
  }

  @Get('download/:name')
  downloadFile(@Param('name') name: string): StreamableFile {
    const file = this.tabFile[name];

    if (!file) {
      throw new NotFoundException('File not found');
    }

    return new StreamableFile(file.buffer, {
      type: file.mimetype,
      disposition: `attachment; filename="${file.originalname}"`,
    });
  }

  @Get()
  getFile(@Res() res) {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    file.pipe(res);
  }

  @Get('file2')
  getFile2(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }
}
