import { fail } from '@sveltejs/kit';

import { writeFileSync } from 'fs';

import * as potrace from 'potrace'

export const actions = {
  default: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());

    if (
      !(formData.image as File).name ||
      (formData.image as File).name === 'undefined'
    ) {
      return fail(400, {
        error: true,
        message: 'You must provide a file to upload'
      });
    }

    const { image } = formData as { image: File };

    writeFileSync(`static/imgs/${image.name}`, Buffer.from(await image.arrayBuffer()));

    potrace.trace(`static/imgs/${image.name}`, function(err, svg) {
        if (err) throw err;
        writeFileSync(`static/svgs/${image.name}.svg`, svg);
      });

    return {
        success: true
    };
  }
};