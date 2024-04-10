import torchxrayvision as xrv
import torch, torchvision
from PIL import Image
import numpy as np


class XRay():
    def __init__(self):
        self.transform = torchvision.transforms.Compose(
            [xrv.datasets.XRayCenterCrop(), xrv.datasets.XRayResizer(224)])
        self.model = xrv.models.DenseNet(weights="densenet121-res224-rsna")

    def _prepare(self, img_path):
        img = np.array(Image.open(img_path))
        img = xrv.datasets.normalize(img, 255)

        if img.ndim == 3:
            img = img.mean(2)

        img = img[None, ...]
        img = self.transform(img)
        img = torch.from_numpy(img)
        return img

    def predict(self, img_path):
        img_tensor = self._prepare(img_path)
        outputs = self.model(img_tensor[None, ...])
        results = outputs[0][8].detach().numpy()
        return results
